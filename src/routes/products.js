const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Panggil koneksi DB tunggal yang SAMA!

// Endpoint Ambil Kopi
router.get('/', (req, res) => {
  // Nyentuh Tabel 'products' di duskcoffee_db yang SAMA
  const query = 'SELECT * FROM products';
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;