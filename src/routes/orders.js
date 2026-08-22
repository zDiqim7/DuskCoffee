const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/orders
router.post('/', async (req, res) => {
  const {
    customer_name, phone, address, notes, mode, payment, items
  } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  const subtotal = items.reduce((s, it) => s + (Number(it.price) * Number(it.quantity || 1)), 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const delivery_fee = mode === 'delivery' ? 10 : 0;
  const total = +(subtotal + tax + delivery_fee).toFixed(2);

  try {
    const conn = db.promise ? db.promise() : db;
    const [orderResult] = await conn.query(
      'INSERT INTO orders (customer_name, phone, address, notes, mode, payment, subtotal, delivery_fee, tax, total, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,NOW())',
      [customer_name, phone, address, notes, mode, payment, subtotal, delivery_fee, tax, total]
    );

    const orderId = orderResult.insertId;

    // insert order items
    const itemPromises = items.map(it => {
      const productId = it.id || null;
      const name = it.name || null;
      const price = Number(it.price) || 0;
      const quantity = Number(it.quantity) || 1;
      return conn.query('INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?,?,?,?,?)', [orderId, productId, name, price, quantity]);
    });

    await Promise.all(itemPromises);

    res.json({ success: true, orderId });
  } catch (err) {
    console.error('Failed to save order:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
