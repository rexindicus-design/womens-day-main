const mysql = require('mysql2/promise');

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

async function checkData() {
  try {
    const connection = await pool.getConnection();
    
    console.log('📊 Checking database data...\n');
    
    // Check nominations count
    const [nomCount] = await connection.execute('SELECT COUNT(*) as total FROM nominations');
    console.log(`✓ Total nominations: ${nomCount[0].total}`);
    
    // Check admin users
    const [adminCount] = await connection.execute('SELECT COUNT(*) as total FROM admin_users');
    console.log(`✓ Total admin users: ${adminCount[0].total}`);
    
    // List admin users
    const [admins] = await connection.execute('SELECT id, username, email, role FROM admin_users');
    if (admins.length > 0) {
      console.log('\n👥 Admin users:');
      admins.forEach(admin => {
        console.log(`   - ${admin.username} (${admin.email}) - Role: ${admin.role}`);
      });
    }
    
    // Sample nominations
    const [samples] = await connection.execute('SELECT id, nominee_name, category, status FROM nominations LIMIT 5');
    if (samples.length > 0) {
      console.log('\n📝 Sample nominations:');
      samples.forEach(nom => {
        console.log(`   - ${nom.id}: ${nom.nominee_name} (${nom.category}) - ${nom.status}`);
      });
    }
    
    // Check attachments
    const [attCount] = await connection.execute('SELECT COUNT(*) as total FROM nomination_attachments');
    console.log(`\n✓ Total attachments: ${attCount[0].total}`);
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkData();
