const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Read secret variable from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Supaya Express bisa membaca data JSON dari frontend/fetch
app.use(express.static('public')); // Menyajikan HTML, CSS, Gambar dari folder public
app.use('/api/products', require('./src/routes/products')); // Calling endpoint on products.js

// Import Routes (Panggil file jalur API dari folder src)
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const ordersRoutes = require('./src/routes/orders');
const contactRoutes = require('./src/routes/contact');

// Use Routes (Set URL utamanya)
app.use('/api/auth', authRoutes);         // Guest checkout OTP endpoints
app.use('/api/products', productRoutes);   // Hasilnya: /api/products (ambil menu kopi)
app.use('/api/orders', ordersRoutes);     // Hasilnya: /api/orders (simpan pesanan)
app.use('/api/contact', contactRoutes);   // Contact form email endpoint

// RUN Server Express-Kawai ><
app.listen(PORT, () => {
  console.log(`Server DuskCoffee running on http://localhost:${PORT}`);
});