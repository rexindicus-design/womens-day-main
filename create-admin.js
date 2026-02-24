const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

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

async function createAdminUser() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔐 Creating admin user...');
    
    const username = 'admin';
    const password = 'admin123';
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    const sql = `INSERT INTO admin_users (username, email, password_hash, role) 
                 VALUES (?, ?, ?, 'admin')
                 ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`;
    
    await connection.execute(sql, [
      username,
      'admin@womensday.com',
      passwordHash
    ]);
    
    console.log('\n✅ Admin user created successfully!');
    console.log('📋 Login Credentials:');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔗 Access admin at: http://localhost:3000/admin/login');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAdminUser();
