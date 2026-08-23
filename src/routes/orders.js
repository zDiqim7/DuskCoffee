const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { getOtp, deleteOtp } = require('../config/otpStore');

const getOrderColumns = async (conn) => {
  const [rows] = await conn.query(
    `SELECT COLUMN_NAME AS column_name
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'orders'`
  );
  return new Set(rows.map((row) => row.column_name));
};

const buildOrderInsert = async (conn, orderData) => {
  const columnSet = await getOrderColumns(conn);
  const insertMap = {
    customer_name: orderData.customer_name,
    customer_email: orderData.customer_email,
    customer_phone: orderData.customer_phone,
    phone: orderData.phone,
    address: orderData.address,
    notes: orderData.notes,
    mode: orderData.mode,
    payment: orderData.payment,
    subtotal: orderData.subtotal,
    delivery_fee: orderData.delivery_fee,
    tax: orderData.tax,
    total: orderData.total,
    total_amount: orderData.total_amount,
    status: orderData.status || 'pending',
    created_at: new Date(),
  };

  const columns = [];
  const values = [];

  Object.entries(insertMap).forEach(([key, value]) => {
    if (value === undefined || value === null || !columnSet.has(key)) return;
    columns.push(key);
    values.push(value);
  });

  if (!columns.length) {
    throw new Error('No compatible order columns found in orders table');
  }

  const placeholders = columns.map(() => '?').join(', ');
  const sql = `INSERT INTO orders (${columns.join(', ')}) VALUES (${placeholders})`;
  return { sql, values };
};

router.post('/verify-and-checkout', async (req, res) => {
  const { customer_name, customer_email, customer_phone, phone, address, notes, mode, payment, items, otp } = req.body || {};
  const email = String(customer_email || '').trim();
  const finalPhone = String(customer_phone || phone || '').trim();
  const finalName = String(customer_name || '').trim();

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  if (!finalName) {
    return res.status(400).json({ error: 'Customer name is required.' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  if (!finalPhone) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  if (!otp || !String(otp).trim()) {
    return res.status(400).json({ error: 'OTP code is required.' });
  }

  const otpEntry = getOtp(email);
  if (!otpEntry || otpEntry.otp !== String(otp).trim()) {
    return res.status(400).json({ error: 'Invalid or expired OTP code.' });
  }

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const delivery_fee = mode === 'delivery' ? 10 : 0;
  const total = +(subtotal + tax + delivery_fee).toFixed(2);

  try {
    const conn = db.promise ? db.promise() : db;
    await conn.beginTransaction();

    const insertOrder = await buildOrderInsert(conn, {
      customer_name: finalName,
      customer_email: email,
      customer_phone: finalPhone,
      phone: finalPhone,
      address: address || null,
      notes: notes || null,
      mode: mode || 'pickup',
      payment: payment || 'QRIS',
      subtotal,
      delivery_fee,
      tax,
      total,
      total_amount: total,
      status: 'pending',
    });

    const [orderResult] = await conn.query(insertOrder.sql, insertOrder.values);
    const orderId = orderResult.insertId;

    const orderItemQueries = items.map((item) => {
      const productId = item.id || null;
      const name = item.name || null;
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return conn.query(
        'INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [orderId, productId, name, price, quantity]
      );
    });

    await Promise.all(orderItemQueries);
    await conn.commit();
    deleteOtp(email);

    res.json({ success: true, orderId, total });
  } catch (error) {
    if (db.promise) {
      try { await db.promise().rollback(); } catch (e) {}
    }
    console.error('Failed to verify and save order:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { customer_name, phone, address, notes, mode, payment, items, customer_email } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  const email = String(customer_email || '').trim();
  const finalPhone = String(phone || '').trim();

  if (!customer_name || !finalPhone) {
    return res.status(400).json({ error: 'Customer name and phone are required.' });
  }

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const delivery_fee = mode === 'delivery' ? 10 : 0;
  const total = +(subtotal + tax + delivery_fee).toFixed(2);

  try {
    const conn = db.promise ? db.promise() : db;
    const [orderResult] = await conn.query(
      'INSERT INTO orders (customer_name, customer_email, phone, address, notes, mode, payment, subtotal, delivery_fee, tax, total, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())',
      [customer_name, email || null, finalPhone, address || null, notes || null, mode || 'pickup', payment || 'QRIS', subtotal, delivery_fee, tax, total]
    );

    const orderId = orderResult.insertId;
    await Promise.all(items.map((item) => conn.query(
      'INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)',
      [orderId, item.id || null, item.name || null, Number(item.price) || 0, Number(item.quantity) || 1]
    )));

    res.json({ success: true, orderId, total });
  } catch (err) {
    console.error('Failed to save order:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
