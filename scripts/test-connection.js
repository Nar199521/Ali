require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'mysql',
      ssl: process.env.MYSQL_SSL ? { ciphers: process.env.MYSQL_SSL_CIPHER } : undefined
    });
    const [rows] = await conn.query('SELECT NOW() AS now');
    console.log('Connected. NOW():', rows);
    await conn.end();
  } catch (err) {
    console.error('Connection failed:', err.message || err);
    process.exit(1);
  }
})();
