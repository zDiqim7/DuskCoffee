const express = require('express');
const router = express.Router();
const { setOtp, getOtp, deleteOtp } = require('../config/otpStore');

const sendOtpEmail = async (email, otp) => {
  const emailTo = String(email || '').trim();
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  // Priority 1: Gmail SMTP for local dev / personal mail setup
  if (process.env.SMTP_HOST && smtpUser && smtpPassword) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"DuskCoffee Development" <${smtpUser}>`,
        to: emailTo,
        subject: 'DuskCoffee verification code',
        html: `<p>Your DuskCoffee verification code is <strong>${otp}</strong>. This code expires in 5 minutes.</p>`,
      });

      console.log('OTP email sent via Gmail SMTP:', info.messageId);
      return;
    } catch (error) {
      console.error('Gmail SMTP send failed:', error);
      throw error;
    }
  }

  // Fallback: Resend
  if (process.env.RESEND_API_KEY) {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [emailTo],
      subject: 'DuskCoffee verification code',
      html: `<p>Your DuskCoffee verification code is <strong>${otp}</strong>. This code expires in 5 minutes.</p>`,
    });

    console.log('OTP email sent via Resend:', response?.id || 'ok');
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

module.exports = router;