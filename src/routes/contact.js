const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

const contactToEmail = process.env.CONTACT_TO_EMAIL || 'quantum99q@gmail.com';

const sendContactEmail = async (name, email, phone, message, rating) => {
  // Priority 1: Nodemailer (Gmail SMTP)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${name} <${process.env.SMTP_USER}>`,
      to: contactToEmail,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h3>New message from DuskCoffee website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Rating:</strong> ${rating || '-'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    return;
  }

  // Fallback: Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [contactToEmail],
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h3>New message from DuskCoffee website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Rating:</strong> ${rating || '-'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    return;
  }

  throw new Error('No email service configured (SMTP or Resend)');
};

router.post('/', async (req, res) => {
  const { name, email, phone, message, rating } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
  }

  try {
    await sendContactEmail(name, email, phone, message, rating);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send contact message.',
      error: error.message,
    });
  }
});

module.exports = router;
