const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function setupAdmin() {
  const config = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
  };

  console.log('Connecting to:', { host: config.host, port: config.port, user: config.user, database: config.database });

  try {
    const connection = await mysql.createConnection(config);
    
    // Generate bcrypt hash for Admin@2026
    const adminPassword = 'Admin@2026';
    const hashedPassword = '$2a$10$P1oa7WgJAMYT8BJcnKo2qO.4emM5Dm9YOGmKaXYqZEXIHbnClXqiC'; // Pre-computed hash
    
    // Check if admins table exists
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admins'",
      [config.database]
    );

    if (tables.length === 0) {
      console.log('❌ admins table does not exist. Creating...');
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          name VARCHAR(255),
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('✓ admins table created');
    }

    // Check if admin already exists
    const [adminRows] = await connection.execute('SELECT id, email FROM admins WHERE email = ?', ['admin@example.com']);
    
    if (adminRows.length > 0) {
      console.log('✓ Admin already exists, updating password...');
      await connection.execute(
        'UPDATE admins SET password = ?, name = ?, is_active = TRUE WHERE email = ?',
        [hashedPassword, 'Admin', 'admin@example.com']
      );
      console.log('✓ Admin password updated');
    } else {
      console.log('✓ Creating admin account...');
      await connection.execute(
        'INSERT INTO admins (username, name, email, password, is_active) VALUES (?, ?, ?, ?, TRUE)',
        ['admin', 'Admin', 'admin@example.com', hashedPassword]
      );
      console.log('✓ Admin account created');
    }

    // Verify admin account
    const [verify] = await connection.execute('SELECT id, username, email, is_active FROM admins WHERE email = ?', ['admin@example.com']);
    
    if (verify.length > 0) {
      const admin = verify[0];
      console.log('\n✓ Admin account verified:');
      console.log(`  ID: ${admin.id}`);
      console.log(`  Username: ${admin.username}`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Active: ${admin.is_active ? 'YES' : 'NO'}`);
      console.log('\n✓ Login credentials:');
      console.log(`  Email: admin@example.com`);
      console.log(`  Password: ${adminPassword}`);
      console.log(`  URL: http://localhost:3000/admin/signin`);
    } else {
      console.log('❌ Failed to verify admin account');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupAdmin();
