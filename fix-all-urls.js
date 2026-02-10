const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'AliMydb',
  password: process.env.MYSQL_PASSWORD || 'Ali@2026',
  database: process.env.MYSQL_DATABASE || 'AliMydb',
};

async function run() {
  const pool = mysql.createPool(config);
  const conn = await pool.getConnection();

  try {
    console.log('Altering columns to VARCHAR(2048) where applicable...');

    const alters = [
      "ALTER TABLE products MODIFY image_url VARCHAR(2048)",
      "ALTER TABLE categories MODIFY image_url VARCHAR(2048)",
      "ALTER TABLE product_images MODIFY url VARCHAR(2048)",
      "ALTER TABLE uploads MODIFY url VARCHAR(2048)",
      "ALTER TABLE home_banners MODIFY image_url VARCHAR(2048)",
      "ALTER TABLE viva_banners MODIFY image_url VARCHAR(2048)"
    ];

    for (const sql of alters) {
      try {
        console.log('Running:', sql);
        await conn.execute(sql);
      } catch (err) {
        console.warn('Skipping or failed:', sql, '-', err.message);
      }
    }

    console.log('Done.');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    conn.release();
    await pool.end();
  }
}

run();
