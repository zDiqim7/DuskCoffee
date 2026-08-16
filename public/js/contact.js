const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required!' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'quantum99q@gmail.com',
      subject: `Hello World! from ${name}`,
      html: `
      <h3>New Message from Contact Form!</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email from:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || '-'}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ message: 'Message sent!', data });
  } catch (error) {
    console.error('Error Resend:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;

const sendButton = document.querySelector('#contact-form .btn');
sendButton.addEventListener('click', async (event) => {
  event.preventDefault();
});