import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { sendEmail, generateRegistrationEmailHTML } from '@/lib/email';
import { generateRegistrationPDF } from '@/lib/generateRegistrationPDF';

// Type definitions
interface NominationData {
  // Section 0
  category: string;
  // Section 1
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
  // Section 2
  sector: string;
  otherSector?: string;
  initiativeTitle: string;
  startDate: string;
  endDate: string;
  innovationDescription: string;
  outcomesAchieved: string;
  executionLeadership: string;
  sustainScale?: string;
  // Section 4
  declarationAccepted: boolean;
  // Attachments
  attachments?: Array<{
    name: string;
    link: string;
  }>;
}

// Validation helper
function validateRequired(data: NominationData): string[] {
  const errors: string[] = [];
  
  if (!data.category) errors.push('Category is required');
  if (!data.nomineeName) errors.push('Nominee Name is required');
  if (!data.mobileNumber) errors.push('Mobile Number is required');
  if (!data.emailId) errors.push('Email ID is required');
  if (!data.cityDistrict) errors.push('City & District is required');
  if (!data.designation) errors.push('Designation is required');
  if (!data.organization) errors.push('Organization is required');
  if (!data.sector) errors.push('Sector/Industry is required');
  if (!data.initiativeTitle) errors.push('Initiative Title is required');
  if (!data.startDate) errors.push('Start Date is required');
  if (!data.endDate) errors.push('End Date is required');
  if (!data.innovationDescription) errors.push('Innovation description is required');
  if (!data.outcomesAchieved) errors.push('Outcomes achieved is required');
  if (!data.executionLeadership) errors.push('Execution & leadership is required');
  if (!data.declarationAccepted) errors.push('Declaration must be accepted');
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.emailId && !emailRegex.test(data.emailId)) {
    errors.push('Invalid email format');
  }
  
  // Word count validation
  const countWords = (text: string) => text?.trim().split(/\s+/).filter(w => w.length > 0).length || 0;
  
  if (countWords(data.innovationDescription) > 180) {
    errors.push('Innovation description exceeds 180 word limit');
  }
  if (countWords(data.outcomesAchieved) > 200) {
    errors.push('Outcomes achieved exceeds 200 word limit');
  }
  if (countWords(data.executionLeadership) > 180) {
    errors.push('Execution & leadership exceeds 180 word limit');
  }
  if (data.sustainScale && countWords(data.sustainScale) > 150) {
    errors.push('Sustain & scale exceeds 150 word limit');
  }
  
  return errors;
}

// POST - Create new nomination
export async function POST(request: NextRequest) {
  try {
    const data: NominationData = await request.json();
    
    // Validate required fields
    const validationErrors = validateRequired(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Insert nomination into database
    const insertQuery = `
      INSERT INTO nominations (
        category,
        nominee_name,
        gender,
        date_of_birth,
        mobile_number,
        email_id,
        city_district,
        designation,
        organization,
        office_address,
        years_in_org,
        years_in_designation,
        year_of_incorporation,
        revenue,
        website_url,
        social_media_links,
        sector,
        other_sector,
        initiative_title,
        start_date,
        end_date,
        innovation_description,
        outcomes_achieved,
        execution_leadership,
        sustain_scale,
        declaration_accepted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      data.category,
      data.nomineeName,
      data.gender || null,
      data.dateOfBirth || null,
      data.mobileNumber,
      data.emailId,
      data.cityDistrict,
      data.designation,
      data.organization,
      data.officeAddress || null,
      data.yearsInOrg ? parseInt(data.yearsInOrg) : null,
      data.yearsInDesignation ? parseInt(data.yearsInDesignation) : null,
      data.yearOfIncorporation ? parseInt(data.yearOfIncorporation) : null,
      data.revenue || null,
      data.websiteUrl || null,
      data.socialMediaLinks || null,
      data.sector,
      data.otherSector || null,
      data.initiativeTitle,
      data.startDate,
      data.endDate,
      data.innovationDescription,
      data.outcomesAchieved,
      data.executionLeadership,
      data.sustainScale || null,
      data.declarationAccepted ? 1 : 0,
    ];
    
    const result = await query<ResultSetHeader>(insertQuery, values);
    const nominationId = result.insertId;
    
    // Insert attachments if any
    if (data.attachments && data.attachments.length > 0) {
      for (let i = 0; i < data.attachments.length; i++) {
        const attachment = data.attachments[i];
        if (attachment.name || attachment.link) {
          await query(
            `INSERT INTO nomination_attachments (nomination_id, attachment_number, document_name, link_url) VALUES (?, ?, ?, ?)`,
            [nominationId, i + 1, attachment.name || null, attachment.link || null]
          );
        }
      }
    }
    
    // Send confirmation email with PDF
    try {
      // Generate PDF
      const pdfBuffer = await generateRegistrationPDF({
        nominationId,
        category: data.category,
        nomineeName: data.nomineeName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        mobileNumber: data.mobileNumber,
        emailId: data.emailId,
        cityDistrict: data.cityDistrict,
        designation: data.designation,
        organization: data.organization,
        officeAddress: data.officeAddress,
        yearsInOrg: data.yearsInOrg,
        yearsInDesignation: data.yearsInDesignation,
        yearOfIncorporation: data.yearOfIncorporation,
        revenue: data.revenue,
        websiteUrl: data.websiteUrl,
        socialMediaLinks: data.socialMediaLinks,
        sector: data.sector,
        otherSector: data.otherSector,
        initiativeTitle: data.initiativeTitle,
        startDate: data.startDate,
        endDate: data.endDate,
        innovationDescription: data.innovationDescription,
        outcomesAchieved: data.outcomesAchieved,
        executionLeadership: data.executionLeadership,
        sustainScale: data.sustainScale,
        attachments: data.attachments,
      });

      // Generate email HTML
      const emailHTML = generateRegistrationEmailHTML({
        nomineeName: data.nomineeName,
        category: data.category,
        nominationId,
        emailId: data.emailId,
      });

      // Send email with PDF attachment
      await sendEmail({
        to: data.emailId,
        subject: `SIMATS EmpowHER Awards 2026 - Nomination Confirmation #${nominationId}`,
        html: emailHTML,
        attachments: [
          {
            filename: `nomination_${nominationId}_${data.nomineeName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      });

      console.log(`Confirmation email sent to ${data.emailId}`);
    } catch (emailError) {
      // Log email error but don't fail the registration
      console.error('Failed to send confirmation email:', emailError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Nomination submitted successfully',
      nominationId: nominationId,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Check for specific MySQL errors
    if (error instanceof Error) {
      if (error.message.includes('ER_NO_SUCH_TABLE')) {
        return NextResponse.json(
          { success: false, error: 'Database tables not found. Please run the schema.sql script first.' },
          { status: 500 }
        );
      }
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { success: false, error: 'Cannot connect to database. Please check MySQL is running.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to submit nomination. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - Fetch nominations (optional - for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let sql = 'SELECT * FROM nominations';
    const conditions: string[] = [];
    const params: unknown[] = [];
    
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    
    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const nominations = await query(sql, params);
    
    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM nominations';
    if (conditions.length > 0) {
      countSql += ' WHERE ' + conditions.join(' AND ');
    }
    const countResult = await query<Array<{ total: number }>>(countSql, params.slice(0, -2));
    const total = countResult[0]?.total || 0;
    
    return NextResponse.json({
      success: true,
      data: nominations,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
    
  } catch (error) {
    console.error('Fetch nominations error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch nominations' },
      { status: 500 }
    );
  }
}
