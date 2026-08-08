// 1. Import Module Utama
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Baca variabel rahasia dari file .env

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(cors());
app.use(express.json()); // Supaya Express bisa membaca data JSON dari frontend/fetch
app.use(express.static('public')); // Menyajikan HTML, CSS, Gambar dari folder public

// 3. Import Routes (Panggil file jalur API dari folder src)
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

// 4. Gunakan Routes (Set URL utamanya)
app.use('/api/auth', authRoutes);         // Hasilnya: /api/auth/login, /api/auth/register
app.use('/api/products', productRoutes);   // Hasilnya: /api/products (ambil menu kopi)

// 5. Jalankan Server
app.listen(PORT, () => {
  console.log(`Server DuskCoffee running on http://localhost:${PORT}`);
});