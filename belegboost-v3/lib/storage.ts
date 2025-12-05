import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

// File validation constants
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_MIME_TYPES = [
  'text/csv',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/octet-stream', // For generic file types
];

const ALLOWED_EXTENSIONS = ['.csv', '.pdf', '.xls', '.xlsx'];

// Configuration for R2/S3
interface StorageConfig {
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName?: string;
  endpoint?: string;
}

// Get configuration from environment variables
function getStorageConfig(): StorageConfig | null {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;

  // If any required config is missing, return null to use fallback
  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    return null;
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  };
}

// Initialize S3 client for R2
function createS3Client(config: StorageConfig): S3Client {
  return new S3Client({
    region: 'auto', // R2 uses 'auto' as the region
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId!,
      secretAccessKey: config.secretAccessKey!,
    },
  });
}

// Validate file before upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  // Check MIME type
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file MIME type: ${file.type}`,
    };
  }

  return { valid: true };
}

// Generate a secure S3 key
export function generateS3Key(
  organizationId: string,
  submissionId: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const randomId = nanoid(8);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

  return `${organizationId}/${submissionId}/${timestamp}-${randomId}-${sanitizedFileName}`;
}

// Upload file to R2 storage
export async function uploadFileToR2(
  file: File,
  organizationId: string,
  submissionId: string
): Promise<{ s3Key: string; sizeBytes: number }> {
  // Validate file first
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Get storage configuration
  const config = getStorageConfig();

  // If R2 is not configured, use fallback placeholder
  if (!config) {
    console.warn('R2 storage not configured. Using placeholder for development.');
    const s3Key = generateS3Key(organizationId, submissionId, file.name);
    return { s3Key, sizeBytes: file.size };
  }

  // Create S3 client
  const s3Client = createS3Client(config);

  // Generate S3 key
  const s3Key = generateS3Key(organizationId, submissionId, file.name);

  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: s3Key,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size,
      Metadata: {
        originalName: file.name,
        organizationId,
        submissionId,
        uploadedAt: new Date().toISOString(),
      },
    });

    await s3Client.send(command);

    console.log(`File uploaded successfully to R2: ${s3Key}`);

    return {
      s3Key,
      sizeBytes: file.size,
    };
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    throw new Error(
      `Failed to upload file to storage: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Export a generic upload function that handles the storage abstraction
export async function uploadFile(
  file: File,
  metadata: {
    organizationId: string;
    submissionId: string;
  }
): Promise<{ s3Key: string; sizeBytes: number }> {
  return uploadFileToR2(file, metadata.organizationId, metadata.submissionId);
}
