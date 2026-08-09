const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi!' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'quantum99q@gmail.com',
      subject: `Hello World! from ${name}`,
      html: `
      <h3>Ada Pesan Baru dari Contact Form!</h3>
        <p><b>Nama:</b> ${name}</p>
        <p><b>Email Pengirim:</b> ${email}</p>
        <p><b>No HP:</b> ${phone || '-'}</p>
        <p><b>Pesan:</b></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ message: 'Pesan berhasil terkirim!', data });
  } catch (error) {
    console.error('Error Resend:', error);
    res.status(500).json({ message: 'Gagal mengirim pesan', error: error.message });
  }
});

module.exports = router;

const sendButton = document.querySelector('#contact-form .btn');
sendButton.addEventListener('click', async (event) => {
  event.preventDefault();
});