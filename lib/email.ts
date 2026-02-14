import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL || 'simatsempowher.toi@gmail.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"SIMATS EmpowHER Awards" <${process.env.SMTP_EMAIL || 'simatsempowher.toi@gmail.com'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

// Generate registration confirmation email HTML
export function generateRegistrationEmailHTML(data: {
  nomineeName: string;
  category: string;
  nominationId: number;
  emailId: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation - SIMATS EmpowHER Awards 2026</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #C41E7F 0%, #6B2D5B 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">SIMATS EmpowHER Awards 2026</h1>
        <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Nomination Confirmation</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #C41E7F; margin: 0 0 20px 0; font-size: 20px;">Thank You for Your Nomination!</h2>
        
        <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
          Dear <strong>${data.nomineeName}</strong>,
        </p>
        
        <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
          We are pleased to confirm that your nomination for the <strong>SIMATS EmpowHER Awards 2026</strong> has been successfully submitted.
        </p>
        
        <!-- Nomination Details Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDF2F8; border-radius: 8px; margin: 20px 0;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="color: #6B2D5B; margin: 0 0 15px 0; font-size: 16px;">Nomination Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 5px 0; color: #666666; width: 40%;">Nomination ID:</td>
                  <td style="padding: 5px 0; color: #333333; font-weight: bold;">#${data.nominationId}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #666666;">Category:</td>
                  <td style="padding: 5px 0; color: #333333; font-weight: bold;">${data.category}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #666666;">Nominee Name:</td>
                  <td style="padding: 5px 0; color: #333333; font-weight: bold;">${data.nomineeName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #666666;">Status:</td>
                  <td style="padding: 5px 0; color: #D4AF37; font-weight: bold;">Pending Review</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
          Our jury panel will review your nomination and you will be notified about the next steps. Please find your complete nomination details attached as a PDF document.
        </p>
        
        <!-- Important Notice -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-left: 4px solid #D4AF37; margin: 20px 0;">
          <tr>
            <td style="padding: 15px; background-color: #FFFBEB;">
              <p style="color: #92400E; margin: 0; font-size: 14px;">
                <strong>Important:</strong> The award ceremony will be held on <strong>March 8, 2026</strong> at SIMATS Campus, Chennai. Shortlisted nominees will be contacted separately.
              </p>
            </td>
          </tr>
        </table>
        
        <p style="color: #333333; line-height: 1.6; margin: 20px 0 0 0;">
          If you have any questions, please contact us at:
        </p>
        <ul style="color: #333333; line-height: 1.8; margin: 10px 0;">
          <li>Dr. GUNITA ARUN CHANDHOK - 9003286689</li>
          <li>Dr. JOTHILAKSHMY - 9941912481</li>
          <li>Email: simatsempowher.toi@gmail.com</li>
        </ul>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #6B2D5B; padding: 20px; text-align: center;">
        <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px;">
          SIMATS (Saveetha Institute of Medical and Technical Sciences) & Times of India
        </p>
        <p style="color: #ffffff; opacity: 0.7; margin: 0; font-size: 12px;">
          © ${new Date().getFullYear()} SIMATS EmpowHER Awards. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export default transporter;
