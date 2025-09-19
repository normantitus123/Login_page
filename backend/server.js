const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.json()); // Parse JSON body

// Respond to GET request on the root route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// Respond to POST request on the root route
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

app.post('/', (req, res) => 
{
  const {
    Email_ID,
    Password
  } =req.body;
  
  console.log("User Login .",req.body);
  res.status(201).send('201 - User Login')
});

app.all('*', (req, res) => {
  res.status(404).send('404 - Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});