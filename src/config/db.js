// src/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '71826quantum#sql',
  database: process.env.DB_NAME || 'duskcoffee_db' // 1 DB untuk semua tabel!
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MariaDB/MySQL duskcoffee_db!');
});

module.exports = db; // Ekspor objek koneksinya