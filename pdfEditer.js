const express = require('express');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'em',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const multer = require('multer');
// const mysql = require('mysql2/promise');

// const app = express();
const upload = multer({ dest: 'uploads/' });
// Endpoint to edit a PDF
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      const { originalname, path } = req.file;
      const result = await connection.query(`INSERT INTO pdfs(filename, path) VALUES (?, ?)`, [
        originalname,
        path,
      ]);
    //   res.json({ id: result.insertId });
      res.json({ statuscode:"200k",
    message:"pdf upload successfully"  });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload PDF' });
    }
  });
  
  
  // app.post('/edit/:id', async (req, res) => {
  //     console.log("..........")
  //   const { id } = req.params;
  //   console.log(id)
  //   const text = req.body;
  //   console.log(text)
  
  //   try {
  //       console.log(">>>>>>>>>>>>>")
  //     const file = await connection.query(`SELECT * FROM pdfs WHERE id = ?`, [id]);
  //     console.log(file)
  
  //     if (!file || !file[0]) {
  //       return res.status(404).json({ error: 'PDF not found' });
  //     }
  
  //     const pdfDoc = await PDFDocument.load(fs.readFileSync(file[0].path));
  //     const page = pdfDoc.getPages()[0];
  
  //     page.drawText(text, { x: 50, y: 50 });
  
  //     const modifiedPath = `edited_${file[0].filename}`;
  //     fs.writeFileSync(modifiedPath, await pdfDoc.save());
  // console.log("edit")
  //     res.json({ path: modifiedPath });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to edit PDF' });
  //   }
  // });
  

app.listen(port, () => {
  console.log(`PDF editor API listening at http://localhost:${port}`);
});
