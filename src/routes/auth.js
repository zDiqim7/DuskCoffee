const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { setOtp, getOtp, deleteOtp } = require('../config/otpStore');

const sendOtpEmail = async (email, otp) => {
  const emailTo = String(email || '').trim();
  const fromAddress = process.env.EMAIL_FROM || 'noreply@duskcoffee.local';

  if (process.env.RESEND_API_KEY) {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: fromAddress,
      to: [emailTo],
      subject: 'DuskCoffee verification code',
      html: `<p>Your DuskCoffee verification code is <strong>${otp}</strong>. This code expires in 5 minutes.</p>`,
    });
    return;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: fromAddress,
      to: emailTo,
      subject: 'DuskCoffee verification code',
      html: `<p>Your DuskCoffee verification code is <strong>${otp}</strong>. This code expires in 5 minutes.</p>`,
    });
    return;
  }

  console.log(`OTP DEBUG for ${emailTo}: ${otp}`);
};

router.post('/send-otp', async (req, res) => {
  const { email } = req.body || {};
  const normalizedEmail = String(email || '').trim();

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Email is required and must be valid.' });
  }

  try {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setOtp(normalizedEmail, otp);
    await sendOtpEmail(normalizedEmail, otp);

    res.json({
      success: true,
      message: 'Verification code has been sent to your email.',
      email: normalizedEmail,
    });
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).json({ message: 'Failed to send verification code.', error: error.message });
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body || {};
  const normalizedEmail = String(email || '').trim();
  const normalizedOtp = String(otp || '').trim();

  if (!normalizedEmail || !normalizedOtp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  const entry = getOtp(normalizedEmail);
  if (!entry) {
    return res.status(400).json({ message: 'OTP expired or not found. Please request a new code.' });
  }

  if (entry.otp !== normalizedOtp) {
    return res.status(400).json({ message: 'Invalid OTP code.' });
  }

  deleteOtp(normalizedEmail);
  res.json({ success: true, message: 'OTP verified successfully.' });
});


// acctually not needed
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Semua kolom wajib diisi, bro!' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email ini udah terdaftar, pakaikan email lain!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlInsert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(sqlInsert, [username, email, hashedPassword]);

        res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Server!', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah!' });
        }

        const secretKey = process.env.JWT_SECRET || 'rahasia_super_duskcoffee';
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1d' }
        );

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