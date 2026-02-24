const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'womensday',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Categories for the awards
const categories = [
  'Healthcare Excellence',
  'Women Entrepreneurship',
  'Education & Skill Development',
  'Social Impact & Community Development',
  'Environmental Sustainability',
  'Technology & Innovation',
  'Arts & Culture',
  'Sports Excellence',
  'Leadership & Governance',
  'Rural Development'
];

// Sectors to use
const sectors = [
  'Healthcare & Hospitals / Public Health',
  'Education',
  'Agriculture & Agribusiness',
  'Technology & IT',
  'Manufacturing',
  'Retail & E-commerce',
  'Nonprofit / NGO',
  'Government / Public Service',
  'Financial Services',
  'Energy & Power'
];

// Sample data generators
function generateEmail(firstName, lastName, index) {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
}

function generatePhoneNumber() {
  return '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
}

function generateDate(yearsBack = 5) {
  const end = new Date();
  const start = new Date(end.getTime() - yearsBack * 365 * 24 * 60 * 60 * 1000);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const nominees = [
  { first: 'Priya', last: 'Sharma' },
  { first: 'Anjali', last: 'Verma' },
  { first: 'Neha', last: 'Gupta' },
  { first: 'Radhika', last: 'Singh' },
  { first: 'Kavya', last: 'Nair' },
  { first: 'Sneha', last: 'Reddy' },
  { first: 'Pooja', last: 'Bhat' },
  { first: 'Divya', last: 'Kumar' },
  { first: 'Ritika', last: 'Banerjee' },
  { first: 'Swati', last: 'Chopra' },
  { first: 'Meera', last: 'Pillai' },
  { first: 'Isha', last: 'Malhotra' },
  { first: 'Tanvi', last: 'Desai' },
  { first: 'Nisha', last: 'Joshi' },
  { first: 'Shreya', last: 'Tiwari' },
  { first: 'Riya', last: 'Rao' },
  { first: 'Ananya', last: 'Dutta' },
  { first: 'Diya', last: 'Saxena' },
  { first: 'Esha', last: 'Patel' },
  { first: 'Fatima', last: 'Khan' },
];

const cities = [
  'Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Pune', 'Kolkata', 'Ahmedabad', 'Lucknow', 'Chandigarh',
  'Jaipur', 'Surat', 'Indore', 'Coimbatore', 'Kochi',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Nagpur', 'Bhopal'
];

const designations = [
  'CEO', 'Founder', 'Director', 'Manager', 'Coordinator',
  'Doctor', 'Entrepreneur', 'Consultant', 'Officer', 'Administrator',
  'Educator', 'Social Worker', 'Engineer', 'Scientist', 'Architect'
];

const organizations = [
  'XYZ Healthcare Initiative', 'Innovation Labs India', 'Rural Development Trust',
  'Green Earth Foundation', 'Tech for Good', 'Women Empowerment Society',
  'Education First NGO', 'Sustainable Solutions Ltd', 'Community Health Center',
  'Agricultural Cooperative', 'Digital India Initiative', 'Skill Development Board',
  'Environmental Protection Network', 'Artisan Support Program', 'Women\'s Business Hub',
  'Educational Research Institute', 'Healthcare Access Network', 'Social Justice Forum',
  'Technology Center', 'Cultural Heritage Foundation'
];

const initiativeTitles = [
  'Rural Healthcare Access Initiative',
  'Women Entrepreneurship Support Program',
  'Digital Literacy for Rural Communities',
  'Sustainable Living Through Innovation',
  'Tech Skills for Underprivileged Youth',
  'Environmental Conservation Drive',
  'Women Leadership Development Program',
  'Agricultural Modernization Project',
  'Healthcare Worker Training Initiative',
  'Community Water Management System',
  'Women Safety & Empowerment Program',
  'Online Education Platform for Rural Areas',
  'Waste Management & Recycling Initiative',
  'Women\'s Financial Independence Program',
  'Healthcare Awareness Campaign',
  'Skill Development for Women',
  'Rural Infrastructure Development',
  'Environmental Restoration Project',
  'Digital Payment System for Remote Areas',
  'Women\'s Health Screening Program'
];

function generateNominationRecord(index) {
  const nominee = nominees[index % nominees.length];
  const category = categories[index % categories.length];
  const sector = sectors[index % sectors.length];
  const city = cities[index % cities.length];
  const designation = designations[index % designations.length];
  const organization = organizations[index % organizations.length];
  const initiativeTitle = initiativeTitles[index % initiativeTitles.length];
  
  const startDate = generateDate(4);
  const endDate = new Date(startDate.getTime() + Math.random() * 2 * 365 * 24 * 60 * 60 * 1000);
  const dob = new Date(1975 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
  
  return {
    category,
    nominee_name: `${nominee.first} ${nominee.last} ${index}`,
    gender: 'Female',
    date_of_birth: formatDate(dob),
    mobile_number: generatePhoneNumber(),
    email_id: generateEmail(nominee.first, nominee.last, index),
    city_district: city,
    designation,
    organization,
    office_address: `${Math.floor(Math.random() * 1000)} Street, ${city}, India`,
    years_in_org: Math.floor(Math.random() * 15) + 1,
    years_in_designation: Math.floor(Math.random() * 10) + 1,
    year_of_incorporation: 2000 + Math.floor(Math.random() * 24),
    revenue: `${Math.floor(Math.random() * 100) + 10} Crores`,
    website_url: `https://www.example${index}.com`,
    social_media_links: `https://linkedin.com/in/nominee${index}, https://twitter.com/nominee${index}`,
    sector,
    other_sector: null,
    initiative_title: `${initiativeTitle} - Phase ${Math.floor(index / 5) + 1}`,
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
    innovation_description: `Innovative initiative focused on bringing positive change through ${category.toLowerCase()}. This initiative has successfully impacted over ${1000 + Math.floor(Math.random() * 100000)} beneficiaries. The program includes comprehensive training, resource allocation, and community engagement components.`,
    outcomes_achieved: `Successfully achieved 60% improvement in target outcomes. Generated employment for ${50 + Math.floor(Math.random() * 500)} individuals. Received recognition and awards for excellence. Sustainable modeled developed for replication across ${2 + Math.floor(Math.random() * 8)} other regions. Secured funding of Rs ${10 + Math.floor(Math.random() * 100)} crores for expansion.`,
    execution_leadership: `Led a diverse team of ${10 + Math.floor(Math.random() * 200)} professionals. Secured strategic partnerships with government and NGOs. Personally supervised implementation and quality control. Mobilized resources and managed budget of Rs ${5 + Math.floor(Math.random() * 50)} crores. Trained ${20 + Math.floor(Math.random() * 500)} community leaders for sustainability.`,
    sustain_scale: `Planning expansion to ${3 + Math.floor(Math.random() * 10)} new locations by ${2027 + Math.floor(Math.random() * 4)}. Developing AI and technology-based solutions for scalability. Creating detailed replication model for other states and regions. Establishing permanent funding mechanism and governance structure.`,
    declaration_accepted: true,
    status: ['pending', 'under_review', 'shortlisted', 'selected'][Math.floor(Math.random() * 4)]
  };
}

async function seedDatabase() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🌱 Starting database seeding...');
    
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Copy test_upload.jpg to uploads directory
    const testUploadPath = process.argv[2];
    if (!testUploadPath || !fs.existsSync(testUploadPath)) {
      console.error('❌ Error: test_upload.jpg file not found at:', testUploadPath);
      console.log('Usage: node seed-nominations.js /path/to/test_upload.jpg');
      process.exit(1);
    }
    
    const fileName = 'test_upload.jpg';
    const destPath = path.join(uploadDir, fileName);
    fs.copyFileSync(testUploadPath, destPath);
    console.log('✅ Copied test_upload.jpg to public/uploads/');
    
    // Generate and insert 50 records
    for (let i = 1; i <= 50; i++) {
      const record = generateNominationRecord(i);
      
      const sql = `INSERT INTO nominations (
        category, nominee_name, gender, date_of_birth, mobile_number, email_id,
        city_district, designation, organization, office_address, years_in_org,
        years_in_designation, year_of_incorporation, revenue, website_url,
        social_media_links, sector, other_sector, initiative_title, start_date,
        end_date, innovation_description, outcomes_achieved, execution_leadership,
        sustain_scale, declaration_accepted, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
      
      const values = [
        record.category,
        record.nominee_name,
        record.gender,
        record.date_of_birth,
        record.mobile_number,
        record.email_id,
        record.city_district,
        record.designation,
        record.organization,
        record.office_address,
        record.years_in_org,
        record.years_in_designation,
        record.year_of_incorporation,
        record.revenue,
        record.website_url,
        record.social_media_links,
        record.sector,
        record.other_sector,
        record.initiative_title,
        record.start_date,
        record.end_date,
        record.innovation_description,
        record.outcomes_achieved,
        record.execution_leadership,
        record.sustain_scale,
        record.declaration_accepted,
        record.status
      ];
      
      await connection.execute(sql, values);
      
      // Add attachment for every nomination
      const attachmentSql = `INSERT INTO nomination_attachments (
        nomination_id, attachment_number, document_name, file_path, file_url
      ) VALUES (?, ?, ?, ?, ?)`;
      
      const lastQuery = `SELECT LAST_INSERT_ID() as id`;
      const [lastResult] = await connection.execute(lastQuery);
      const nominationId = lastResult[0].id;
      
      await connection.execute(attachmentSql, [
        nominationId,
        1,
        'Supporting Document 1',
        `/uploads/${fileName}`,
        `/uploads/${fileName}`
      ]);
      
      if (i % 10 === 0) {
        console.log(`✓ Inserted ${i} records...`);
      }
    }
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 50 nomination records created');
    console.log('   - 10 different categories distributed');
    console.log('   - 50 attachment records linked to test_upload.jpg');
    console.log('   - Various statuses: pending, under_review, shortlisted, selected');
    console.log('\n📍 Attachment file location: public/uploads/test_upload.jpg');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
