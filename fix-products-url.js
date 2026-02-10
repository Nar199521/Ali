const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'AliMydb',
  password: process.env.MYSQL_PASSWORD || 'Ali@2026',
  database: process.env.MYSQL_DATABASE || 'AliMydb',
};

async function fixProductsTable() {
  const pool = mysql.createPool(config);
  
  try {
    const conn = await pool.getConnection();
    
    console.log('Altering products table...');
    await conn.execute(
      'ALTER TABLE products MODIFY image_url VARCHAR(1024)'
    );
    
    console.log('✅ Successfully updated products.image_url to VARCHAR(1024)');
    
    conn.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixProductsTable();
