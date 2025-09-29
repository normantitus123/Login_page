const express = require('express');
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { query, closePool } = require("./database/db_connect.js");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const app = express();

// Built-in body parsers (no need for body-parser package)
app.use(express.json());            // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded forms

app.use(cors({
  origin: process.env.BACKEND_URL,
  credentials: true
}));

// Respond to GET request on the root route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// Respond o POST request on the root route
app.post('/Register', async(req, res) => 
{
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email_ID,
    Password
  } =req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);
    // Insert user
    const result = await query(
      `INSERT INTO users (first_name, last_name, phone, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING  first_name, last_name, created_at`,
      [FirstName, LastName, PhoneNumber, Email_ID, hashedPassword]
    );
    console.log("✅ User Registered:", result.rows[0]);
    return res.json({ success: true, user: result.rows[0] });
    }
     catch (err) 
     {
        console.error("❌ Error registering user:", err.message);

        // Duplicate email error
        if (err.code === "23505") 
        {
          return res.json({
            success: false,
            message: "Email already exists. Please use another email."
          });
        }

      // Generic error
        return res.json
        ({
          success: false,
          message: "Registration failed. Please try again."
        });
  }
}
);

app.post('/', async(req, res) => 
{
    const 
    {
      Email_ID,
      Password
    } =req.body;
  
    try 
    {
    // Find user
      const result = await query
        (
          `SELECT id, first_name, last_name, email, password
          FROM users 
          WHERE email = $1 LIMIT 1`,
          [Email_ID]
        );

      if (result.rows.length === 0) 
      {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      const user = result.rows[0];
      

      // Compare password
      const validPassword = await bcrypt.compare(Password, user.password);
      if (!validPassword) 
      {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }

      console.log("✅ User Login:", user.first_name,user.last_name);
      res.status(200).json({ success: true, message: "Login successful", user: { id: user.id, first_name: user.first_name,last_name: user.last_name } });

  } catch (err) 
  {
    console.error("❌ Database error:", err.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

app.all('*', (req, res) => {
  res.status(404).send('404 - Page not found');
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await closePool();
  process.exit(0);
});

// Start the server
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`App listening at ${process.env.BACKEND_URL}`);
});