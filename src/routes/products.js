const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint GET /api/products/menu
router.get('/menu', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint GET /api/products/beans
router.get('/bean', async (req, respone) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error:message });
  }
});

module.exports = router;