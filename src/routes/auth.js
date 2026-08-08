const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Panggil koneksi MariaDB lo

// ==========================================
// 1. ENDPOINT REGISTER (Create Account)
// URL: POST http://localhost:3000/api/auth/register
// ==========================================
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validasi sederhana: Pastikan input gak kosong
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi, bro!' });
    }

    try {
        // A. Cek apakah email sudah terdaftar di MariaDB
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email ini udah terdaftar, pakaikan email lain!' });
        }

        // B. Enkripsi/Hash Password (10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // C. Simpan user baru ke database
        const sqlInsert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(sqlInsert, [username, email, hashedPassword]);

        res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Server!', error: error.message });
    }
});

// ==========================================
// 2. ENDPOINT LOGIN (Sign In)
// URL: POST http://localhost:3000/api/auth/login
// ==========================================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    try {
        // A. Cari user berdasarkan email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        const user = users[0];

        // B. Bandingkan password ketikan user dengan Hash di Database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        // C. Jika cocok, terbitkan JWT Token
        const secretKey = process.env.JWT_SECRET || 'rahasia_super_duskcoffee';
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        // D. Kirim respon sukses beserta token ke client
        res.json({
            message: 'Login Berhasil!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Server!', error: error.message });
    }
});

module.exports = router;