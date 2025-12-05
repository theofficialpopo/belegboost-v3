import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, files } from '@/db/schema';
import { uploadFile, validateFile } from '@/lib/storage';
import { auth } from '@/auth';
import { logger } from '@/lib/logger';
import { unauthorized, forbidden, badRequest, serverError } from '@/lib/api-errors';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return unauthorized();
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

    // Wrap submission and file record creation in a transaction
    // Note: File uploads to S3/R2 happen inside the transaction callback
    // If any operation fails, both submission and file records will be rolled back
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

      // Upload files and collect file records
      const fileRecords: Array<{ originalName: string; s3Key: string; mimeType: string; sizeBytes: number }> = [];

      // Upload data file
      if (dataFile) {
        const { s3Key, sizeBytes } = await uploadFile(dataFile, {
          organizationId,
          submissionId: submission.id,
        });
        fileRecords.push({
          originalName: dataFile.name,
          s3Key,
          mimeType: dataFile.type,
          sizeBytes,
        });
      }

      // Upload PDF file if provided
      if (pdfFile) {
        const { s3Key, sizeBytes } = await uploadFile(pdfFile, {
          organizationId,
          submissionId: submission.id,
        });
        fileRecords.push({
          originalName: pdfFile.name,
          s3Key,
          mimeType: pdfFile.type,
          sizeBytes,
        });
      }

      // Insert file records
      if (fileRecords.length > 0) {
        await tx.insert(files).values(
          fileRecords.map(file => ({
            submissionId: submission.id,
            originalName: file.originalName,
            s3Key: file.s3Key,
            mimeType: file.mimeType,
            sizeBytes: file.sizeBytes,
            parseStatus: 'pending' as const,
          }))
        );
      }

      return { submissionId: submission.id };
    });

    // Return success response with submission ID
    return NextResponse.json({
      success: true,
      submissionId: result.submissionId,
      message: 'Submission created successfully',
    });

  } catch (error) {
    logger.error('Error creating submission', error);
    return serverError(
      'Failed to create submission',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
