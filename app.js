const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
require('dotenv').config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});


// API endpoint to fetch seat data
app.get('/seats', (req, res) => {
  const query = 'SELECT * FROM seats'; // Fetch all seats from the `seats` table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching seats:', err);
      res.status(500).send('Error fetching seats');
      return;
    }
    res.json(results); // Send the seat data as JSON
  });
});

// API endpoint to book a seat
app.post('/book-seat/:seatId', (req, res) => {
  const seatId = req.params.seatId;
  const { status } = req.body;

  const query = 'UPDATE seats SET status = ? WHERE Seatid = ?';
  db.query(query, [status, seatId], (err, results) => {
    if (err) {
      console.error('Error updating seat status:', err);
      res.status(500).send('Error updating seat status');
      return;
    }
    res.send('Seat status updated successfully');
  });
});



app.get('/dashboard', (req, res) => {
  res.send('Welcome to the Dashboard!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});







// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Database connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root123',
//     database: 'bustracking'
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('MySQL Connected...');
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const sql = 'SELECT * FROM login WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) throw err;

//         if (result.length > 0) {
//             res.json({ success: true, message: 'Login successful' });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid username or password' });
//         }
//     });
// });

// // Sign-Up endpoint
// app.post('/signup', (req, res) => {
//     const { username, email, password } = req.body;

//     const sql = 'INSERT INTO login (username, email, password) VALUES (?, ?, ?)';
//     db.query(sql, [username, email, password], (err, result) => {
//         if (err) {
//             console.error('Error:', err);
//             res.status(500).json({ success: false, message: 'Error creating user' });
//         } else {
//             res.json({ success: true, message: 'User created successfully' });
//         }
//     });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });