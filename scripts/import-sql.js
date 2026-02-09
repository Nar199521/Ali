require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  // Allow overriding the SQL path via env var; default to workspace-local scripts/db.sql
  const sqlPath = process.env.SQL_PATH || path.resolve(__dirname, 'db.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('SQL file not found:', sqlPath);
    console.error('Place your SQL dump at', sqlPath, 'or set SQL_PATH to its location.');
    process.exit(1);
  }
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'mysql',
    multipleStatements: true,
    ssl: process.env.MYSQL_SSL ? { ciphers: process.env.MYSQL_SSL_CIPHER } : undefined
  });

  try {
    console.log('Running SQL import from', sqlPath);
    await conn.query(sql);
    console.log('Import completed successfully.');
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
