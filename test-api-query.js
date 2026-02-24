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

async function testAPI() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔍 Testing API query...\n');
    
    // Simulate the API query with status='all'
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
    console.log('Count Query:', countQuery);
    const [countResult] = await connection.execute(countQuery, queryParams);
    const total = countResult[0].total;
    console.log(`✓ Total nominations: ${total}\n`);

    // Get paginated nominations
    const nominationsQuery = `SELECT * FROM nominations ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const params = [...queryParams, limit, offset];
    console.log('Nominations Query:', nominationsQuery);
    console.log('Query Params:', params);
    
    const [nominations] = await connection.execute(nominationsQuery, params);
    console.log(`✓ Retrieved ${nominations.length} nominations\n`);

    if (nominations.length > 0) {
      console.log('Sample records:');
      nominations.slice(0, 3).forEach(n => {
        console.log(`  - ID: ${n.id}, Name: ${n.nominee_name}, Category: ${n.category}, Status: ${n.status}`);
      });
    }

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAPI();
