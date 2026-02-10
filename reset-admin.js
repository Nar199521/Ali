const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function resetAdminPassword() {
  const config = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
  };

  try {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection(config);
    
    // Get all users
    const [users] = await connection.execute('SELECT id, username, email, role FROM users LIMIT 10');
    
    if (users.length === 0) {
      console.log('No users found in the database.');
      console.log('\nCreating new admin user...');
      const adminPassword = await bcrypt.hash('Admin@2026', 10);
      await connection.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@aliaxpress.com', adminPassword, 'admin']
      );
      console.log('✓ Admin user created!');
      console.log('  Email: admin@aliaxpress.com');
      console.log('  Password: Admin@2026');
    } else {
      console.log('Found users in database:');
      console.log('─'.repeat(60));
      users.forEach((user, i) => {
        console.log(`${i + 1}. Username: ${user.username}\n   Email: ${user.email}\n   Role: ${user.role}`);
      });
      console.log('─'.repeat(60));
      
      // Find admin user
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        console.log(`\nResetting password for admin: ${admin.email}`);
        const newPassword = 'Admin@2026';
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await connection.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, admin.id]);
        console.log('✓ Password reset successfully!');
        console.log(`  Email: ${admin.email}`);
        console.log(`  New Password: ${newPassword}`);
      } else {
        console.log('\n⚠ No admin user found. Creating new one...');
        const adminPassword = await bcrypt.hash('Admin@2026', 10);
        const adminUser = users[0]; // Use first user as admin
        await connection.execute('UPDATE users SET role = ? WHERE id = ?', ['admin', adminUser.id]);
        await connection.execute('UPDATE users SET password = ? WHERE id = ?', [adminPassword, adminUser.id]);
        console.log('✓ Admin role assigned!');
        console.log(`  Email: ${adminUser.email}`);
        console.log(`  Password: Admin@2026`);
      }
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetAdminPassword();
