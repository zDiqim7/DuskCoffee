document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      name: document.querySelector('#contact-name')?.value?.trim(),
      email: document.querySelector('#contact-email')?.value?.trim(),
      phone: document.querySelector('#contact-phone')?.value?.trim(),
      rating: document.querySelector('#contact-rating')?.value || '',
      message: document.querySelector('#contact-message')?.value?.trim(),
    };

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
});