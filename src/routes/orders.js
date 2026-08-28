const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { getOtp, deleteOtp } = require('../config/otpStore');

const insertOrder = (conn, orderData) => conn.query(
  `INSERT INTO orders
   (customer_name, customer_email, customer_phone, address, notes, mode,
    payment, subtotal, delivery_fee, tax, total, status, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
  [
    orderData.customer_name,
    orderData.customer_email,
    orderData.customer_phone,
    orderData.address,
    orderData.notes,
    orderData.mode,
    orderData.payment,
    orderData.subtotal,
    orderData.delivery_fee,
    orderData.tax,
    orderData.total,
    orderData.status || 'pending',
  ]
);

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

  let conn;
  try {
    conn = db.promise ? db.promise() : db;
    await conn.beginTransaction();

    const [orderResult] = await insertOrder(conn, {
      customer_name: finalName,
      customer_email: email,
      customer_phone: finalPhone,
      address: address || null,
      notes: notes || null,
      mode: mode || 'pickup',
      payment: payment || 'QRIS',
      subtotal,
      delivery_fee,
      tax,
      total,
      status: 'pending',
    });

    const orderId = orderResult.insertId;

    const orderItemQueries = items.map((item) => {
      const itemType = item.item_type;
      if (!['menu', 'product'].includes(itemType) || !Number.isInteger(Number(item.id))) {
        throw new Error('Each order item must reference a valid menu or product');
      }
      const menuId = itemType === 'menu' ? Number(item.id) : null;
      const productId = itemType === 'product' ? Number(item.id) : null;
      const name = item.name || null;
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return conn.query(
        'INSERT INTO order_items (order_id, menu_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, menuId, productId, name, price, quantity]
      );
    });

    await Promise.all(orderItemQueries);
    await conn.commit();
    deleteOtp(email);

    res.json({ success: true, orderId, total });
  } catch (error) {
    if (conn) {
      try { await conn.rollback(); } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }
    console.error('Failed to verify and save order:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
