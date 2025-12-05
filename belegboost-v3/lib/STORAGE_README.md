# Storage Implementation Guide

This document describes the file storage implementation for BelegBoost using Cloudflare R2 (S3-compatible storage).

## Overview

The storage system handles uploading accounting documents (CSV, PDF, Excel files) to Cloudflare R2, a cost-effective and GDPR-compliant object storage service suitable for a German accounting SaaS application.

## Features

- **File Validation**: Validates file size (max 50MB) and file types (CSV, PDF, XLS, XLSX)
- **Secure Key Generation**: Organizes files with secure, organized S3 keys
- **Development Fallback**: Works without R2 configuration for local development
- **Error Handling**: Comprehensive error handling and logging
- **Metadata Storage**: Stores file metadata including organization and submission IDs

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key-id"
R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_BUCKET_NAME="belegboost-documents"
```

### Getting R2 Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 section
3. Create a new bucket (e.g., `belegboost-documents`)
4. Go to "Manage R2 API Tokens"
5. Create a new API token with read/write permissions
6. Copy the credentials to your `.env` file

## File Structure

Files are stored with the following key pattern:

```
{organizationId}/{submissionId}/{timestamp}-{randomId}-{sanitizedFilename}
```

Example:
```
org_abc123/sub_xyz789/1701234567890-a1b2c3d4-amex-export.csv
```

This structure provides:
- **Organization isolation**: Files are separated by organization
- **Submission grouping**: Easy to find all files for a submission
- **Collision prevention**: Timestamp + random ID prevents conflicts
- **Traceability**: Original filename is preserved (sanitized)

## Usage

### Uploading Files

```typescript
import { uploadFile } from '@/lib/storage';

const result = await uploadFile(file, {
  organizationId: 'org_abc123',
  submissionId: 'sub_xyz789',
});

console.log(result.s3Key);      // The S3 key where file is stored
console.log(result.sizeBytes);  // File size in bytes
```

### Validating Files

```typescript
import { validateFile } from '@/lib/storage';

const validation = validateFile(file);
if (!validation.valid) {
  console.error(validation.error);
}
```

## File Validation Rules

### Allowed File Types

- **CSV**: `text/csv`
- **PDF**: `application/pdf`
- **Excel (old)**: `application/vnd.ms-excel` (.xls)
- **Excel (new)**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (.xlsx)

### File Size Limit

Maximum file size: **50 MB**

### Validation Checks

1. File size must not exceed 50 MB
2. File extension must be one of: `.csv`, `.pdf`, `.xls`, `.xlsx`
3. MIME type must match allowed types (if provided)

## Development Mode

If R2 environment variables are not configured, the system automatically falls back to a development mode:

- Files are not actually uploaded
- S3 keys are still generated for database consistency
- A warning is logged to the console
- File size is still validated and returned

This allows you to develop and test without needing R2 credentials.

## Error Handling

The upload function throws errors in these cases:

- File validation fails (size, type, extension)
- R2 upload fails (network issues, permissions, etc.)
- Invalid configuration (in production)

Example error handling:

```typescript
try {
  const result = await uploadFile(file, metadata);
} catch (error) {
  if (error.message.includes('File size exceeds')) {
    // Handle file too large
  } else if (error.message.includes('File type not allowed')) {
    // Handle invalid file type
  } else {
    // Handle other upload errors
  }
}
```

## Security Considerations

1. **File Validation**: All files are validated before upload to prevent malicious uploads
2. **Sanitization**: Filenames are sanitized to remove special characters
3. **Metadata**: Upload metadata includes organization and submission IDs for audit trails
4. **Access Control**: R2 API tokens should have minimal required permissions
5. **GDPR Compliance**: R2 can be configured with EU data residency

## Cost Optimization

Cloudflare R2 advantages:

- **No egress fees**: Unlike S3, R2 doesn't charge for downloads
- **Lower storage costs**: ~$0.015/GB/month
- **S3 compatibility**: Easy migration if needed
- **EU data residency**: Good for GDPR compliance

## Monitoring

Key metrics to monitor:

- Upload success/failure rate
- Upload duration
- File sizes
- Storage usage
- API error rates

Consider adding monitoring/logging to track these metrics in production.

## Troubleshooting

### Files not uploading

1. Check R2 environment variables are set correctly
2. Verify R2 bucket exists and is accessible
3. Check API token permissions (needs read/write)
4. Review console logs for specific error messages

### File validation errors

1. Ensure file is under 50 MB
2. Check file extension is allowed (.csv, .pdf, .xls, .xlsx)
3. Verify MIME type matches file extension

### Development fallback

If you see "R2 storage not configured" warnings, add R2 credentials to `.env` or continue in development mode.

## Future Enhancements

Potential improvements:

- [ ] Add support for file deletion/cleanup
- [ ] Implement presigned URLs for direct client uploads
- [ ] Add virus scanning integration
- [ ] Implement file compression for large files
- [ ] Add support for batch uploads
- [ ] Implement upload progress tracking
- [ ] Add file retention policies
