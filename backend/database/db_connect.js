const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "titus123",
  port: 5432,
  database: "login_page",
  max: 10 // max concurrent connections
});

// Export a query function for convenience
async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error("❌ Database query error:", err.message);
    throw err;
  }
}

// Optional: graceful shutdown
async function closePool() {
  await pool.end();
  console.log("🔌 Database pool closed");
}

module.exports = {
  query,
  closePool
};