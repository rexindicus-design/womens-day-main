import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { PDFDocument, StandardFonts, rgb, PDFName, PDFString, PDFArray, PDFDict } from 'pdf-lib';
import path from 'path';
import fs from 'fs/promises';

interface Attachment {
  id: number;
  document_name: string;
  file_path: string | null;
  file_url: string | null;
  link_url: string | null;
}

interface Nomination {
  id: number;
  nominee_name: string;
  category: string;
  status: string;
  mobile_number: string;
  email_id: string;
  date_of_birth?: string;
  gender?: string;
  city_district: string;
  designation: string;
  organization: string;
  office_address?: string;
  years_in_org?: number;
  years_in_designation?: number;
  year_of_incorporation?: number;
  revenue?: string;
  website_url?: string;
  social_media_links?: string;
  sector: string;
  other_sector?: string;
  initiative_title: string;
  start_date: string;
  end_date: string;
  innovation_description: string;
  outcomes_achieved: string;
  execution_leadership: string;
  sustain_scale?: string;
  created_at: string;
  aadhar_number?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch nomination data
    const nominations = await query<Nomination[]>(
      'SELECT * FROM nominations WHERE id = ?',
      [id]
    );

    if (nominations.length === 0) {
      return NextResponse.json({ error: 'Nomination not found' }, { status: 404 });
    }

    const nomination = nominations[0];

    // Fetch attachments
    const attachments = await query<Attachment[]>(
      'SELECT * FROM nomination_attachments WHERE nomination_id = ?',
      [id]
    );

    // Create PDF document using pdf-lib (no external font files needed)
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Colors
    const primaryColor = rgb(196 / 255, 30 / 255, 127 / 255); // #C41E7F
    const secondaryColor = rgb(107 / 255, 45 / 255, 91 / 255); // #6B2D5B
    const grayColor = rgb(102 / 255, 102 / 255, 102 / 255);
    const blackColor = rgb(0, 0, 0);

    // Page settings
    const pageWidth = 595; // A4
    const pageHeight = 842;
    const margin = 50;
    const contentWidth = pageWidth - 2 * margin;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPos = pageHeight - margin;

    // Sanitize text to remove characters that WinAnsi can't encode
    const sanitizeText = (text: string): string => {
      if (!text) return '';
      return text
        .replace(/[\r\n]+/g, ' ')  // Replace newlines with spaces
        .replace(/[\t]+/g, ' ')    // Replace tabs with spaces
        .replace(/\s+/g, ' ')      // Collapse multiple spaces
        .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '') // Remove non-WinAnsi characters
        .trim();
    };

    // Helper functions
    const drawText = (text: string, x: number, y: number, size: number, font = helvetica, color = blackColor) => {
      const safeText = sanitizeText(text || '');
      page.drawText(safeText, { x, y, size, font, color });
    };

    // Draw text with hyperlink
    const drawLink = (text: string, url: string, x: number, y: number, size: number, font = helvetica, color = primaryColor) => {
      const safeText = sanitizeText(text || '');
      const textWidth = font.widthOfTextAtSize(safeText, size);
      
      // Draw the text with underline style
      page.drawText(safeText, { x, y, size, font, color });
      
      // Draw underline for link
      page.drawLine({
        start: { x, y: y - 1 },
        end: { x: x + textWidth, y: y - 1 },
        thickness: 0.5,
        color: color,
      });
      
      // Create the URI action
      const context = pdfDoc.context;
      const actionDict = context.obj({
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      });
      
      // Create link annotation
      const linkAnnotation = context.obj({
        Type: 'Annot',
        Subtype: 'Link',
        Rect: [x, y - 2, x + textWidth, y + size + 2],
        Border: [0, 0, 0],
        A: actionDict,
      });
      
      // Register the annotation
      const ref = context.register(linkAnnotation);
      
      // Add to page's annotations
      const existingAnnots = page.node.lookup(PDFName.of('Annots'), PDFArray);
      if (existingAnnots) {
        existingAnnots.push(ref);
      } else {
        page.node.set(PDFName.of('Annots'), context.obj([ref]));
      }
    };

    const wrapText = (text: string, maxWidth: number, fontSize: number, font = helvetica): string[] => {
      if (!text || text.trim() === '') return ['N/A'];
      const sanitized = sanitizeText(text);
      if (!sanitized) return ['N/A'];
      
      const words = sanitized.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    const addField = (label: string, value: string | number | null | undefined, indent = 0) => {
      const displayValue = value !== null && value !== undefined ? sanitizeText(String(value)) : 'N/A';
      drawText(`${label}: ${displayValue || 'N/A'}`, margin + indent, yPos, 10, helvetica, grayColor);
      yPos -= 16;
      checkPageBreak();
    };

    const addLongField = (label: string, value: string | null | undefined) => {
      drawText(`${label}:`, margin, yPos, 10, helvetica, grayColor);
      yPos -= 14;
      
      const text = value || 'N/A';
      const lines = wrapText(text, contentWidth - 20, 10);
      for (const line of lines) {
        checkPageBreak();
        drawText(line, margin + 10, yPos, 10, helvetica, blackColor);
        yPos -= 14;
      }
      yPos -= 8;
    };

    const addSection = (title: string, sectionNum: string) => {
      yPos -= 10;
      checkPageBreak(50);
      drawText(`${sectionNum}. ${title}`, margin, yPos, 14, helveticaBold, primaryColor);
      yPos -= 6;
      page.drawLine({
        start: { x: margin, y: yPos },
        end: { x: margin + 150, y: yPos },
        thickness: 1,
        color: primaryColor,
      });
      yPos -= 18;
    };

    const checkPageBreak = (requiredSpace = 30) => {
      if (yPos < margin + requiredSpace) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPos = pageHeight - margin;
      }
    };

    // Header
    drawText('SIMATS EmpowHER Awards 2026', margin, yPos, 20, helveticaBold, primaryColor);
    yPos -= 25;
    drawText('Nomination Details', margin, yPos, 12, helvetica, secondaryColor);
    yPos -= 15;

    // Divider line
    page.drawLine({
      start: { x: margin, y: yPos },
      end: { x: pageWidth - margin, y: yPos },
      thickness: 2,
      color: primaryColor,
    });
    yPos -= 25;

    // Info box
    page.drawRectangle({
      x: margin,
      y: yPos - 55,
      width: contentWidth,
      height: 60,
      color: rgb(253 / 255, 242 / 255, 248 / 255),
      borderColor: rgb(232 / 255, 121 / 255, 249 / 255),
      borderWidth: 1,
    });
    drawText(nomination.nominee_name || 'Unknown', margin + 10, yPos - 15, 16, helveticaBold, primaryColor);
    drawText(nomination.category || 'Uncategorized', margin + 10, yPos - 35, 11, helvetica, secondaryColor);
    drawText(`Status: ${(nomination.status || 'pending').toUpperCase()}`, margin + 10, yPos - 50, 10, helvetica, secondaryColor);
    drawText(`ID: ${nomination.id}`, pageWidth - margin - 60, yPos - 50, 10, helvetica, secondaryColor);
    yPos -= 75;

    // Section 1: Personal Information
    addSection('Personal Information', '01');
    addField('Full Name', nomination.nominee_name);
    addField('Email', nomination.email_id);
    addField('Mobile', nomination.mobile_number);
    addField('Aadhar Number', nomination.aadhar_number);
    addField('Gender', nomination.gender);
    addField('Date of Birth', nomination.date_of_birth ? new Date(nomination.date_of_birth).toLocaleDateString() : null);
    addField('City/District', nomination.city_district);

    // Section 2: Professional Information
    addSection('Professional Information', '02');
    addField('Organization', nomination.organization);
    addField('Designation', nomination.designation);
    addField('Sector', nomination.sector);
    if (nomination.other_sector) addField('Other Sector', nomination.other_sector);
    addField('Years in Organization', nomination.years_in_org);
    addField('Years in Designation', nomination.years_in_designation);
    addField('Year of Incorporation', nomination.year_of_incorporation);
    addField('Revenue', nomination.revenue);
    if (nomination.office_address) addLongField('Office Address', nomination.office_address);
    if (nomination.website_url) {
      drawText('Website: ', margin, yPos, 10, helvetica, grayColor);
      const labelWidth = helvetica.widthOfTextAtSize('Website: ', 10);
      drawLink(nomination.website_url, nomination.website_url, margin + labelWidth, yPos, 10, helvetica, primaryColor);
      yPos -= 16;
      checkPageBreak();
    }
    if (nomination.social_media_links) addField('Social Media', nomination.social_media_links);

    // Section 3: Initiative & Impact
    addSection('Initiative & Impact', '03');
    addField('Initiative Title', nomination.initiative_title);
    addField('Start Date', nomination.start_date ? new Date(nomination.start_date).toLocaleDateString() : null);
    addField('End Date', nomination.end_date ? new Date(nomination.end_date).toLocaleDateString() : null);
    yPos -= 10;
    addLongField('Innovation Description', nomination.innovation_description);
    addLongField('Outcomes Achieved', nomination.outcomes_achieved);
    addLongField('Execution & Leadership', nomination.execution_leadership);
    if (nomination.sustain_scale) addLongField('Sustainability & Scale', nomination.sustain_scale);

    // Section 4: Attachments
    addSection('Supporting Documents', '04');
    if (attachments.length === 0) {
      drawText('No documents attached.', margin, yPos, 10, helvetica, grayColor);
      yPos -= 16;
    } else {
      for (const att of attachments) {
        checkPageBreak();
        const docName = att.document_name || 'Document';
        
        if (att.file_url && att.link_url) {
          // Has both file and link
          const extension = att.file_url.split('.').pop()?.toLowerCase() || '';
          drawText(`• ${docName}: [${extension.toUpperCase()} file attached below]`, margin, yPos, 10, helvetica, grayColor);
          yPos -= 14;
          checkPageBreak();
          drawText(`  Link: `, margin + 10, yPos, 9, helvetica, grayColor);
          drawLink(att.link_url, att.link_url, margin + 50, yPos, 9, helvetica, primaryColor);
          yPos -= 16;
        } else if (att.link_url) {
          // Link only - display prominently with clickable hyperlink
          drawText(`• ${docName}:`, margin, yPos, 10, helvetica, grayColor);
          yPos -= 14;
          checkPageBreak();
          // For URLs, draw as clickable link (truncate display if too long, but keep full URL)
          const displayUrl = att.link_url.length > 70 ? att.link_url.substring(0, 67) + '...' : att.link_url;
          drawLink(displayUrl, att.link_url, margin + 10, yPos, 9, helvetica, primaryColor);
          yPos -= 16;
        } else if (att.file_url) {
          // File only
          const extension = att.file_url.split('.').pop()?.toLowerCase() || '';
          drawText(`• ${docName}: [${extension.toUpperCase()} file attached below]`, margin, yPos, 10, helvetica, grayColor);
          yPos -= 16;
        }
      }
    }

    // Footer
    yPos -= 20;
    checkPageBreak();
    const footerText = `Generated on ${new Date().toLocaleString()} | Nomination submitted on ${new Date(nomination.created_at).toLocaleString()}`;
    const footerWidth = helvetica.widthOfTextAtSize(footerText, 8);
    drawText(footerText, (pageWidth - footerWidth) / 2, margin, 8, helvetica, grayColor);

    // Process attachments - add images and merge PDFs
    for (const att of attachments) {
      if (att.file_url) {
        const filePath = att.file_url.startsWith('/') 
          ? path.join(process.cwd(), 'public', att.file_url)
          : att.file_url;

        try {
          const fileBuffer = await fs.readFile(filePath);
          const extension = filePath.split('.').pop()?.toLowerCase() || '';

          if (['jpg', 'jpeg', 'png'].includes(extension)) {
            // Add image on new page
            const imgPage = pdfDoc.addPage([pageWidth, pageHeight]);
            let image;
            if (extension === 'png') {
              image = await pdfDoc.embedPng(fileBuffer);
            } else {
              image = await pdfDoc.embedJpg(fileBuffer);
            }
            
            const imgDims = image.scale(1);
            const scale = Math.min(
              (pageWidth - 100) / imgDims.width,
              (pageHeight - 150) / imgDims.height
            );
            
            imgPage.drawText(att.document_name || 'Attachment', {
              x: 50,
              y: pageHeight - 50,
              size: 14,
              font: helveticaBold,
              color: primaryColor,
            });
            
            imgPage.drawImage(image, {
              x: 50,
              y: pageHeight - 100 - imgDims.height * scale,
              width: imgDims.width * scale,
              height: imgDims.height * scale,
            });
          } else if (extension === 'pdf') {
            // Merge PDF pages
            const attachmentPdf = await PDFDocument.load(fileBuffer);
            const pages = await pdfDoc.copyPages(attachmentPdf, attachmentPdf.getPageIndices());
            pages.forEach((p) => pdfDoc.addPage(p));
          }
        } catch (fileError) {
          console.error(`Error processing attachment ${att.id}:`, fileError);
        }
      }
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="nomination_${nomination.id}_${(nomination.nominee_name || 'details').replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);

    // If the database is unreachable, return a clear 503 so the frontend
    // can show a helpful message to the admin user.
    if (error?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Database connection refused — please start MySQL / check DB settings' },
        { status: 503 }
      );
    }

    // For other errors return the message in development; fall back to a
    // generic message otherwise.
    return NextResponse.json(
      { error: error?.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
