const express = require('express');
const router = express.Router();
const db = require('../config/db');

const normalizeProductImage = (imagePath) => {
  if (!imagePath) return '/img/products/default-product.jpg';
  const trimmed = String(imagePath).trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `/${trimmed.replace(/^\/+/, '')}`;
};

const getProducts = async (req, res) => {
  try {
    const category = String(req.query.category || 'all').toLowerCase().trim();
    let query = 'SELECT * FROM products ORDER BY id ASC';
    const params = [];

    if (category && category !== 'all' && category !== 'all menu' && category !== 'all beans') {
      query = 'SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(category) LIKE ? ORDER BY id ASC';
      params.push(`%${category}%`, `%${category}%`);
    }

    const [rows] = await db.query(query, params);
    const products = rows.map((product) => ({
      ...product,
      image_path: normalizeProductImage(product.image_path),
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
router.get('/beans', getProducts);
router.get('/bean', getProducts);
router.get('/', getProducts);

module.exports = router;