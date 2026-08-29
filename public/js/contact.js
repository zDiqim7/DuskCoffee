// Attach form submission handler
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Contact form submitted');

    const payload = {
      name: document.querySelector('#contact-name')?.value?.trim(),
      email: document.querySelector('#contact-email')?.value?.trim(),
      phone: document.querySelector('#contact-phone')?.value?.trim(),
      rating: document.querySelector('#contact-rating')?.value || '',
      message: document.querySelector('#contact-message')?.value?.trim(),
    };

    console.log('Payload:', payload);

    if (!payload.name || !payload.email || !payload.message) {
      alert('Name, email, and message are required.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message.');
      }

      alert('Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      alert(error.message || 'Failed to send message.');
    }
  });
} else {
  console.error('Contact form not found!');
}