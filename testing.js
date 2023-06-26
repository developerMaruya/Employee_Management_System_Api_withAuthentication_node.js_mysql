const express = require('express');
const mysql = require('mysql');

const app = express();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'em',
});

// Middleware to parse JSON in the request body
app.use(express.json());

// API endpoint to get check-in details by month and year
app.post('/checkin', (req, res) => {
  const { eid, month, year, empsalary } = req.body;

  const sql = `SELECT COUNT(*) AS totalCheckins FROM checkin WHERE eid = ? AND MONTH(STR_TO_DATE(startDate, '%d/%m/%Y')) = ? AND YEAR(STR_TO_DATE(startDate, '%d/%m/%Y')) = ?`;

  pool.query(sql, [eid, month, year], (error, results) => {
    if (error) {
      console.error('Error retrieving check-in details:', error);
      res.status(500).json({ error: 'Failed to retrieve check-in details' });
    } else {
      const totalCheckins = results[0].totalCheckins;
      console.log(totalCheckins)
      const perDaySalary = empsalary / 30;
      console.log(perDaySalary)
      const monthlyS = perDaySalary * totalCheckins;
      const monthlySalary ="RS."+" "+ Math.floor(monthlyS)

      res.json({ monthlySalary });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
