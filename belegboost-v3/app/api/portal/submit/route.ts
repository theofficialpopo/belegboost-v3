import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, files } from '@/db/schema';
import { uploadFile, validateFile } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    // Parse FormData
    const formData = await request.formData();

    // Extract organization ID (from URL param or form data)
    const organizationId = formData.get('organizationId') as string;

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!dataFile) {
      return NextResponse.json(
        { error: 'Data file is required' },
        { status: 400 }
      );
    }

    // Validate files before processing
    const dataFileValidation = validateFile(dataFile);
    if (!dataFileValidation.valid) {
      return NextResponse.json(
        { error: `Invalid data file: ${dataFileValidation.error}` },
        { status: 400 }
      );
    }

    if (pdfFile) {
      const pdfFileValidation = validateFile(pdfFile);
      if (!pdfFileValidation.valid) {
        return NextResponse.json(
          { error: `Invalid PDF file: ${pdfFileValidation.error}` },
          { status: 400 }
        );
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

    // Create submission record
    const [submission] = await db
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

    // Upload files and create file records
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
      await db.insert(files).values(
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

    // Return success response with submission ID
    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: 'Submission created successfully',
    });

  } catch (error) {
    console.error('Error creating submission:', error);

    return NextResponse.json(
      {
        error: 'Failed to create submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
