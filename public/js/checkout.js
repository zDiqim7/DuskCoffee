let mode = 'pickup';
const CART_STORAGE_KEY = 'duskCoffeeCart';

function setMode(next) {
  mode = next;
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === next);
  });
  document.getElementById('addressField').style.display = next === 'delivery' ? 'block' : 'none';
  document.getElementById('deliveryLine').style.display = next === 'delivery' ? 'flex' : 'none';
  renderCheckout();
}

function selectPay(el, type) {
  document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const radio = el.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
  document.getElementById('qrisBox').classList.toggle('show', type === 'qris');
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart', e);
    return [];
  }
}

function formatCurrency(amount) {
  return '$' + Number(amount).toFixed(2);
}

function renderCheckout() {
  const items = loadCart();
  const itemsList = document.getElementById('itemsList');
  const subtotalEl = document.getElementById('subtotalAmount');
  const taxEl = document.getElementById('taxAmount');
  const deliveryEl = document.getElementById('deliveryAmount');
  const totalEl = document.getElementById('totalAmount');
  const countEl = document.querySelector('.receipt-head .count');

  if (!itemsList) return;
  itemsList.innerHTML = '';

  if (items.length === 0) {
    itemsList.innerHTML = '<p style="color:var(--muted);">Your cart is empty.</p>';
  } else {
    items.forEach(it => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div>
          <div class="name">${escapeHtml(it.name)}</div>
          <div class="qty">x${it.quantity}</div>
        </div>
        <div class="price">${formatCurrency(it.price * it.quantity)}</div>
      `;
      itemsList.appendChild(row);
    });
  }

  const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const delivery = mode === 'delivery' ? 10 : 0;
  const total = +(subtotal + tax + delivery).toFixed(2);

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (taxEl) taxEl.textContent = formatCurrency(tax);
  if (deliveryEl) deliveryEl.textContent = formatCurrency(delivery);
  if (totalEl) totalEl.textContent = formatCurrency(total);
  if (countEl) countEl.textContent = `${items.reduce((s,i)=>s+i.quantity,0)} items`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendOtp() {
  const email = document.getElementById('email')?.value?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address first.');
    return;
  }

  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Unable to send OTP');

    alert('Verification code sent to your email.');
  } catch (error) {
    console.error('Send OTP failed:', error);
    alert(error.message || 'Unable to send verification code.');
  }
}

async function placeOrder() {
  const items = loadCart();
  if (!items || items.length === 0) {
    alert('Cart is empty');
    return;
  }

  const customerName = document.getElementById('fname')?.value?.trim();
  const customerPhone = document.getElementById('phone')?.value?.trim();
  const customerEmail = document.getElementById('email')?.value?.trim();
  const otp = document.getElementById('otpInput')?.value?.trim();

  if (!customerName || !customerPhone || !customerEmail) {
    alert('Please complete your name, phone, and email before checkout.');
    return;
  }

  if (!otp || otp.length !== 6) {
    alert('Please enter the 6-digit verification code before placing the order.');
    return;
  }

  const payload = {
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_email: customerEmail,
    phone: customerPhone,
    address: document.getElementById('address')?.value || null,
    notes: document.getElementById('notes')?.value || null,
    mode,
    payment: document.querySelector('.pay-option.selected .name')?.textContent || 'QRIS',
    items,
    otp
  };

  try {
    const res = await fetch('/api/orders/verify-and-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || result.message || 'Order failed');

    localStorage.removeItem(CART_STORAGE_KEY);
    renderCheckout();
    const banner = document.getElementById('confirmBanner');
    if (banner) banner.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Order placed successfully!');
  } catch (error) {
    console.error('Order failed', error);
    alert(error.message || 'Failed to place order. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckout();
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  if (sendOtpBtn) sendOtpBtn.addEventListener('click', sendOtp);
  if (placeOrderBtn) placeOrderBtn.addEventListener('click', placeOrder);
});