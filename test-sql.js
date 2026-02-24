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

async function testSQL() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Testing various queries...\n');

    // Test 1: Simple select without WHERE
    console.log('Test 1: SELECT without WHERE');
    try {
      const [result1] = await connection.execute('SELECT * FROM nominations ORDER BY created_at DESC LIMIT 5');
      console.log(`✓ Success: ${result1.length} rows\n`);
    } catch (e) {
      console.log(`✗ Failed: ${e.message}\n`);
    }

    // Test 2: SELECT with LIMIT using parameters
    console.log('Test 2: SELECT with LIMIT using parameters');
    try {
      const [result2] = await connection.execute(
        'SELECT * FROM nominations ORDER BY created_at DESC LIMIT ?',
        [5]
      );
      console.log(`✓ Success: ${result2.length} rows\n`);
    } catch (e) {
      console.log(`✗ Failed: ${e.message}\n`);
    }

    // Test 3: SELECT with LIMIT and OFFSET using parameters
    console.log('Test 3: SELECT with LIMIT and OFFSET using parameters');
    try {
      const [result3] = await connection.execute(
        'SELECT * FROM nominations ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [10, 0]
      );
      console.log(`✓ Success: ${result3.length} rows\n`);
    } catch (e) {
      console.log(`✗ Failed: ${e.message}\n`);
    }

    // Test 4: LIMIT with unsigned int conversion
    console.log('Test 4: SELECT with converted LIMIT/OFFSET');
    try {
      const [result4] = await connection.execute(
        'SELECT * FROM nominations ORDER BY created_at DESC LIMIT ?,?',
        [10, 0]
      );
      console.log(`✓ Success: ${result4.length} rows\n`);
    } catch (e) {
      console.log(`✗ Failed: ${e.message}\n`);
    }

    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testSQL();
