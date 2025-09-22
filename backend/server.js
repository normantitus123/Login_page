const express = require('express');
const bodyParser = require("body-parser");
const { query, closePool } = require("./database/db_connect.js");

const app = express();
const port = 8080;

// Built-in body parsers (no need for body-parser package)
app.use(express.json());            // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded forms


// Respond to GET request on the root route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// Respond o POST request on the root route
app.post('/Register', (req, res) => 
{
  
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email_ID,
    Password
  } =req.body;
  
  console.log("User Registered.",req.body);
  res.status(201).send('201 - User Created')
});

app.post('/', async(req, res) => 
{
  const {
    Email_ID,
    Password
  } =req.body;
  try 
  {
    // Show current DB time
    const timeResult = await query("SELECT NOW()");
    console.log("DB time:", timeResult.rows[0].now);

  } 
  catch (err) 
  {
    console.error("❌ Database error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
  console.log("User Login:", `Email_ID = ${Email_ID} | Password = ${Password}`);
  res.status(201).send('201 - User Login')
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
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});