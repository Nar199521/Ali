
import mysql from 'mysql2/promise';

const config: any = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
};

// Debug: log config (without password)
console.log('MySQL Config:', {
  host: config.host,
  port: config.port,
  user: config.user,
  database: config.database,
});

const pool = mysql.createPool(config);

export { pool };
