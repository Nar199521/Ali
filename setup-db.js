const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
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
    
    // Read schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`Executing ${statements.length} SQL statements...`);
    for (let i = 0; i < statements.length; i++) {
      try {
        await connection.execute(statements[i]);
        console.log(`✓ Statement ${i + 1}/${statements.length} executed`);
      } catch (err) {
        console.log(`✗ Statement ${i + 1}/${statements.length} failed: ${err.message}`);
      }
    }

    // Create admin user
    console.log('\nCreating admin user...');
    const adminEmail = 'admin@aliaxpress.com';
    const adminPassword = await bcrypt.hash('Admin@2026', 10);
    
    try {
      await connection.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', adminEmail, adminPassword, 'admin']
      );
      console.log(`✓ Admin user created: ${adminEmail}`);
      console.log(`  Password: Admin@2026`);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('✓ Admin user already exists');
      } else {
        console.log(`✗ Failed to create admin user: ${err.message}`);
      }
    }

    await connection.end();
    console.log('\n✓ Database setup completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
