const mysql = require('mysql2/promise');

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

async function testFixedAPI() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔍 Testing FIXED API query...\n');
    
    // Simulate the FIXED API query with status='all'
    const page = 1;
    const limit = 10;
    const status = 'all';
    const offset = (page - 1) * limit;

    let whereClause = '';
    const queryParams = [];

    if (status && status !== 'all') {
        whereClause = 'WHERE status = ?';
        queryParams.push(status);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM nominations ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, queryParams);
    const total = countResult[0].total;
    console.log(`✓ Total nominations: ${total}`);

    // Get paginated nominations - with LITERAL LIMIT/OFFSET
    const whereClausePart = whereClause ? `${whereClause} ` : '';
    const nominationsQuery = `SELECT * FROM nominations ${whereClausePart}ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
    console.log(`✓ Query: ${nominationsQuery}`);
    
    const [nominations] = await connection.execute(nominationsQuery);
    console.log(`✓ Retrieved ${nominations.length} nominations\n`);

    if (nominations.length > 0) {
      console.log('Sample records:');
      nominations.slice(0, 3).forEach(n => {
        console.log(`  - ID: ${n.id}, Name: ${n.nominee_name}, Category: ${n.category}`);
      });
      console.log(`\n✅ API is now working correctly!`);
    }

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testFixedAPI();
