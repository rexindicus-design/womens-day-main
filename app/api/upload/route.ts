import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { query } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract nomination ID from form data
    const nominationId = formData.get('nominationId') as string;
    
    if (!nominationId) {
      return NextResponse.json(
        { success: false, error: 'Nomination ID is required' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', nominationId);
    await mkdir(uploadsDir, { recursive: true });

    const uploadedFiles: { index: number; name: string; path: string; url: string }[] = [];

    // Process each file
    for (let i = 0; i < 5; i++) {
      const file = formData.get(`file_${i}`) as File | null;
      const docName = formData.get(`name_${i}`) as string || '';
      const link = formData.get(`link_${i}`) as string || '';

      if (file && file.size > 0) {
        // Validate file size (max 10MB total, 5MB per file)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: `File ${i + 1} exceeds 5MB limit` },
            { status: 400 }
          );
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
        const fileExtension = path.extname(file.name).toLowerCase();
        if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
          return NextResponse.json(
            { success: false, error: `File ${i + 1} has invalid type. Allowed: PDF, JPG, JPEG, PNG` },
            { status: 400 }
          );
        }

        // Generate safe filename
        const ext = path.extname(file.name);
        const safeFileName = `attachment_${i + 1}_${Date.now()}${ext}`;
        const filePath = path.join(uploadsDir, safeFileName);
        const fileUrl = `/uploads/${nominationId}/${safeFileName}`;

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        uploadedFiles.push({
          index: i,
          name: docName || file.name,
          path: filePath,
          url: fileUrl,
        });

        // Update database with file info
        await query(
          `UPDATE nomination_attachments 
           SET file_path = ?, file_url = ?, document_name = COALESCE(NULLIF(?, ''), document_name)
           WHERE nomination_id = ? AND attachment_number = ?`,
          [filePath, fileUrl, docName, nominationId, i + 1]
        );
      }

      // If no file but there's a document name or link, ensure the record exists
      if (!file && (docName || link)) {
        // Check if record exists
        const existing = await query<{ id: number }[]>(
          `SELECT id FROM nomination_attachments WHERE nomination_id = ? AND attachment_number = ?`,
          [nominationId, i + 1]
        );

        if (existing.length === 0) {
          // Insert new record
          await query(
            `INSERT INTO nomination_attachments (nomination_id, attachment_number, document_name, link_url) VALUES (?, ?, ?, ?)`,
            [nominationId, i + 1, docName || null, link || null]
          );
        } else {
          // Update existing record
          await query(
            `UPDATE nomination_attachments 
             SET document_name = COALESCE(NULLIF(?, ''), document_name),
                 link_url = COALESCE(NULLIF(?, ''), link_url)
             WHERE nomination_id = ? AND attachment_number = ?`,
            [docName, link, nominationId, i + 1]
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      uploadedFiles: uploadedFiles.map(f => ({ name: f.name, url: f.url })),
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
