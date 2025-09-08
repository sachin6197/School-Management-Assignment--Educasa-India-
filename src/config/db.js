const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT = 3306, DB_CONN_LIMIT = 10 } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.warn("⚠️  DB env incomplete. Please configure .env properly.");
}

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: Number(DB_CONN_LIMIT),
  queueLimit: 0,
  charset: "utf8mb4",
});

async function ensureTableExists() {
  const sql = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      INDEX idx_lat_lon (latitude, longitude)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  const conn = await pool.getConnection();
  try {
    await conn.query(sql);
  } finally {
    conn.release();
  }
}

module.exports = { pool, ensureTableExists };
