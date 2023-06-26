const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'em',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});



// module.exports = connection;
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// const db = require('./db');

app.use(express.json());

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// API endpoint for uploading multiple images
app.post('/upload', upload.array('images', 5), (req, res) => {
  const { userId } = req.body;
  const files = req.files;

  if (!files) {
    res.status(400).json({ error: 'No files were uploaded.' });
    return;
  }

  const fileUrls = files.map((file) => {
    return path.join('uploads', file.filename);
  });

  const query = 'INSERT INTO images (userId, url) VALUES ?';
const values = fileUrls.map((url) => [userId, url]);

connection.query(query, [values], (err, result) => {
  if (err) {
    console.error('Error saving images:', err);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
});

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
