import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, files } from '@/db/schema';
import { uploadFile, validateFile, deleteFile } from '@/lib/storage';
import { auth } from '@/auth';
import { logger } from '@/lib/logger';
import { unauthorized, forbidden, badRequest, serverError, isDemoMode, demoModeReadOnly } from '@/lib/api-errors';
import { withCsrfProtection } from '@/lib/csrf';
import { logAudit } from '@/lib/audit';

export const POST = withCsrfProtection(async (request: NextRequest) => {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return unauthorized();
    }

    // Prevent mutations in demo mode
    if (isDemoMode(session.user.organizationId)) {
      return demoModeReadOnly();
    }

    // Parse FormData
    const formData = await request.formData();

    // Extract organization ID (from URL param or form data)
    const organizationId = formData.get('organizationId') as string;

    if (!organizationId) {
      return badRequest('Organization ID is required');
    }

    // SECURITY: Verify the organizationId matches the authenticated user's organization
    // This prevents a user from creating submissions for other organizations
    if (session.user.organizationId !== organizationId) {
      return forbidden('Cannot create submissions for other organizations');
    }

    // Extract form fields
    const clientName = formData.get('companyName') as string;
    const clientNumber = formData.get('clientNumber') as string;
    const clientEmail = formData.get('email') as string;
    const provider = formData.get('provider') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const endBalance = formData.get('endBalance') as string;
    const selectedAdvisor = formData.get('selectedAdvisor') as string;

    // Extract files
    const dataFile = formData.get('dataFile') as File | null;
    const pdfFile = formData.get('pdfFile') as File | null;

    // Validate required fields
    if (!clientName || !clientEmail || !provider || !startDate || !endDate) {
      return badRequest('Missing required fields');
    }

    if (!dataFile) {
      return badRequest('Data file is required');
    }

    // Validate files before processing
    const dataFileValidation = validateFile(dataFile);
    if (!dataFileValidation.valid) {
      return badRequest(`Invalid data file: ${dataFileValidation.error}`);
    }

    if (pdfFile) {
      const pdfFileValidation = validateFile(pdfFile);
      if (!pdfFileValidation.valid) {
        return badRequest(`Invalid PDF file: ${pdfFileValidation.error}`);
      }
    }

    // Map provider name to logo identifier
    const providerLogoMap: Record<string, string> = {
      'American Express': 'amex',
      'Wise': 'wise',
      'PayPal': 'paypal',
      'Revolut': 'revolut',
      // Add more mappings as needed
    };
    const providerLogo = providerLogoMap[provider] || 'generic';

    // TWO-PHASE COMMIT PATTERN:
    // Phase 1: Upload files to R2 BEFORE starting the database transaction
    // Phase 2: Insert database records in a transaction
    // If Phase 2 fails, clean up uploaded files (compensating transaction)

    // Track uploaded files for cleanup in case of transaction failure
    const uploadedFiles: Array<{ s3Key: string; originalName: string; mimeType: string; sizeBytes: number }> = [];

    try {
      // PHASE 1: Upload files to R2 storage (external system, cannot be rolled back)
      // We generate a temporary submission ID for the S3 key path
      const tempSubmissionId = crypto.randomUUID();

      // Upload data file
      if (dataFile) {
        const { s3Key, sizeBytes } = await uploadFile(dataFile, {
          organizationId,
          submissionId: tempSubmissionId,
        });
        uploadedFiles.push({
          s3Key,
          originalName: dataFile.name,
          mimeType: dataFile.type,
          sizeBytes,
        });
      }

      // Upload PDF file if provided
      if (pdfFile) {
        const { s3Key, sizeBytes } = await uploadFile(pdfFile, {
          organizationId,
          submissionId: tempSubmissionId,
        });
        uploadedFiles.push({
          s3Key,
          originalName: pdfFile.name,
          mimeType: pdfFile.type,
          sizeBytes,
        });
      }

      // PHASE 2: Insert database records in a transaction
      // If this fails, we'll clean up the uploaded files in the catch block
      const result = await db.transaction(async (tx) => {
        // Create submission record
        const [submission] = await tx
          .insert(submissions)
          .values({
            organizationId,
            clientName,
            clientNumber: clientNumber || null,
            clientEmail,
            provider,
            providerLogo,
            dateFrom: new Date(startDate),
            dateTo: new Date(endDate),
            endBalance: endBalance || null,
            assignedAdvisor: selectedAdvisor || null,
            status: 'new',
            transactionCount: 0,
          })
          .returning();

        if (!submission) {
          throw new Error('Failed to create submission');
        }

        // Insert file records (linking uploaded files to the submission)
        if (uploadedFiles.length > 0) {
          await tx.insert(files).values(
            uploadedFiles.map(file => ({
              submissionId: submission.id,
              originalName: file.originalName,
              s3Key: file.s3Key,
              mimeType: file.mimeType,
              sizeBytes: file.sizeBytes,
              parseStatus: 'pending' as const,
            }))
          );
        }

        // Log audit events for GDPR compliance
        // Log submission creation
        await logAudit(tx, request, {
          organizationId,
          userId: session.user.id,
          action: 'submission_created',
          resourceType: 'submission',
          resourceId: submission.id,
          metadata: {
            clientName: submission.clientName,
            clientEmail: submission.clientEmail,
            provider: submission.provider,
            dateFrom: submission.dateFrom.toISOString(),
            dateTo: submission.dateTo.toISOString(),
            fileCount: uploadedFiles.length,
          },
        });

        // Log file uploads
        for (const file of uploadedFiles) {
          await logAudit(tx, request, {
            organizationId,
            userId: session.user.id,
            action: 'file_uploaded',
            resourceType: 'file',
            resourceId: submission.id, // Link to submission
            metadata: {
              fileName: file.originalName,
              mimeType: file.mimeType,
              sizeBytes: file.sizeBytes,
              submissionId: submission.id,
            },
          });
        }

        return { submissionId: submission.id };
      });

      // Success! Return the submission ID
      return NextResponse.json({
        success: true,
        submissionId: result.submissionId,
        message: 'Submission created successfully',
      });

    } catch (error) {
      // COMPENSATING TRANSACTION: Clean up uploaded files if database transaction failed
      // This prevents orphaned files in R2 storage
      logger.error('Transaction failed, cleaning up uploaded files', { uploadedFiles });

      for (const file of uploadedFiles) {
        try {
          await deleteFile(file.s3Key);
          logger.info('Successfully deleted orphaned file', { s3Key: file.s3Key });
        } catch (deleteError) {
          // Log deletion errors but don't throw - we already have a main error
          logger.error('Failed to delete orphaned file', {
            s3Key: file.s3Key,
            error: deleteError
          });
        }
      }

      // Re-throw the original error
      throw error;
    }

  } catch (error) {
    logger.error('Error creating submission', error);
    return serverError(
      'Failed to create submission',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
