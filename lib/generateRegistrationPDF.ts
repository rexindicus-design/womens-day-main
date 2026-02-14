import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface RegistrationData {
  nominationId: number;
  category: string;
  nomineeName: string;
  gender?: string;
  dateOfBirth?: string;
  mobileNumber: string;
  emailId: string;
  cityDistrict: string;
  designation: string;
  organization: string;
  officeAddress?: string;
  yearsInOrg?: string;
  yearsInDesignation?: string;
  yearOfIncorporation?: string;
  revenue?: string;
  websiteUrl?: string;
  socialMediaLinks?: string;
  sector: string;
  otherSector?: string;
  initiativeTitle: string;
  startDate: string;
  endDate: string;
  innovationDescription: string;
  outcomesAchieved: string;
  executionLeadership: string;
  sustainScale?: string;
  attachments?: Array<{
    name: string;
    link: string;
  }>;
}

// Sanitize text to remove characters that WinAnsi can't encode
function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '')
    .trim();
}

export async function generateRegistrationPDF(data: RegistrationData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Colors
  const primaryColor = rgb(196 / 255, 30 / 255, 127 / 255); // #C41E7F
  const secondaryColor = rgb(107 / 255, 45 / 255, 91 / 255); // #6B2D5B
  const grayColor = rgb(102 / 255, 102 / 255, 102 / 255);
  const blackColor = rgb(0, 0, 0);
  const goldColor = rgb(212 / 255, 175 / 255, 55 / 255); // #D4AF37

  // Page settings
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const contentWidth = pageWidth - 2 * margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPos = pageHeight - margin;

  // Helper functions
  const drawText = (text: string, x: number, y: number, size: number, font = helvetica, color = blackColor) => {
    const safeText = sanitizeText(text || '');
    page.drawText(safeText, { x, y, size, font, color });
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

  const addField = (label: string, value: string | number | null | undefined) => {
    const displayValue = value !== null && value !== undefined ? sanitizeText(String(value)) : 'N/A';
    drawText(`${label}: ${displayValue || 'N/A'}`, margin, yPos, 10, helvetica, grayColor);
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
  drawText('Nomination Registration Confirmation', margin, yPos, 12, helvetica, secondaryColor);
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
  drawText(data.nomineeName || 'Unknown', margin + 10, yPos - 15, 16, helveticaBold, primaryColor);
  drawText(data.category || 'Uncategorized', margin + 10, yPos - 35, 11, helvetica, secondaryColor);
  drawText(`Nomination ID: #${data.nominationId}`, margin + 10, yPos - 50, 10, helvetica, goldColor);
  drawText(`Submitted: ${new Date().toLocaleDateString()}`, pageWidth - margin - 120, yPos - 50, 10, helvetica, secondaryColor);
  yPos -= 75;

  // Section 1: Personal Information
  addSection('Personal Information', '01');
  addField('Full Name', data.nomineeName);
  addField('Email', data.emailId);
  addField('Mobile', data.mobileNumber);
  addField('Gender', data.gender);
  addField('Date of Birth', data.dateOfBirth);
  addField('City/District', data.cityDistrict);

  // Section 2: Professional Information
  addSection('Professional Information', '02');
  addField('Organization', data.organization);
  addField('Designation', data.designation);
  addField('Sector', data.sector);
  if (data.otherSector) addField('Other Sector', data.otherSector);
  addField('Years in Organization', data.yearsInOrg);
  addField('Years in Designation', data.yearsInDesignation);
  addField('Year of Incorporation', data.yearOfIncorporation);
  addField('Revenue', data.revenue);
  if (data.officeAddress) addLongField('Office Address', data.officeAddress);
  if (data.websiteUrl) addField('Website', data.websiteUrl);
  if (data.socialMediaLinks) addField('Social Media', data.socialMediaLinks);

  // Section 3: Initiative & Impact
  addSection('Initiative & Impact', '03');
  addField('Initiative Title', data.initiativeTitle);
  addField('Start Date', data.startDate);
  addField('End Date', data.endDate);
  yPos -= 10;
  addLongField('Innovation Description', data.innovationDescription);
  addLongField('Outcomes Achieved', data.outcomesAchieved);
  addLongField('Execution & Leadership', data.executionLeadership);
  if (data.sustainScale) addLongField('Sustainability & Scale', data.sustainScale);

  // Section 4: Attachments
  addSection('Supporting Documents', '04');
  if (!data.attachments || data.attachments.length === 0) {
    drawText('No documents attached.', margin, yPos, 10, helvetica, grayColor);
    yPos -= 16;
  } else {
    let attachmentCount = 0;
    for (let i = 0; i < data.attachments.length; i++) {
      const att = data.attachments[i];
      if (att && (att.name || att.link)) {
        attachmentCount++;
        checkPageBreak();
        // Draw document name
        const docName = att.name ? sanitizeText(att.name) : `Attachment ${i + 1}`;
        drawText(`${attachmentCount}. ${docName}`, margin, yPos, 10, helveticaBold, blackColor);
        yPos -= 14;
        
        // Draw link if present (with wrapping for long URLs)
        if (att.link) {
          const linkLines = wrapText(att.link, contentWidth - 30, 9);
          for (const line of linkLines) {
            checkPageBreak();
            drawText(line, margin + 15, yPos, 9, helvetica, rgb(0, 0, 0.8));
            yPos -= 12;
          }
        }
        yPos -= 6;
      }
    }
    if (attachmentCount === 0) {
      drawText('No documents attached.', margin, yPos, 10, helvetica, grayColor);
      yPos -= 16;
    }
  }

  // Footer
  yPos -= 20;
  checkPageBreak();
  const footerText = `This document serves as your nomination confirmation. Please keep it for your records.`;
  const footerWidth = helvetica.widthOfTextAtSize(footerText, 8);
  drawText(footerText, (pageWidth - footerWidth) / 2, margin + 20, 8, helvetica, grayColor);
  
  // Contact info
  const contactText = 'Contact: Dr. GUNITA ARUN CHANDHOK - 9003286689 | Dr. JOTHILAKSHMY - 9941912481 | Email: simatsempowher.toi@gmail.com';
  const contactWidth = helvetica.widthOfTextAtSize(contactText, 7);
  drawText(contactText, (pageWidth - contactWidth) / 2, margin + 8, 7, helvetica, grayColor);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
