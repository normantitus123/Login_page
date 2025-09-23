// backend/setup_db.js
const { Client } = require("pg");
const commonConfig = require("./dbConfig");

const dbName = "login_page";

async function createDatabase() {
  const client = new Client({ ...commonConfig, database: "postgres" }); // connect to default
  try {
    await client.connect();
    console.log("Connected to default postgres DB ✅");

    // Check if DB already exists
    const check = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (check.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully ✅`);
    } else {
      console.log(`⚡ Database "${dbName}" already exists → skipping creation`);
    }
  } catch (err) {
    console.error("❌ Error checking/creating database:", err.message);
  } finally {
    await client.end();
  }
}

async function createUsersTable() {
  const client = new Client({ ...commonConfig, database: dbName });

  try {
    await client.connect();

    // Check if "users" table exists
    const check = await client.query(
      `SELECT EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = 'users'
       );`
    );

    if (!check.rows[0].exists) {
      const query = `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50),
          last_name VARCHAR(50),
          phone VARCHAR(15),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await client.query(query);
      console.log("Users table created successfully ✅");
    } else {
      console.log("⚡ Users table already exists → skipping creation");
    }
  } catch (err) {
    console.error("❌ Error checking/creating users table:", err.message);
  } finally {
    await client.end();
  }
}

(async () => {
  await createDatabase();
  await createUsersTable();
})();
