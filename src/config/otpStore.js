const otpStore = new Map();

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();

const createOtpEntry = (otp) => ({
  otp,
  expiresAt: Date.now() + 5 * 60 * 1000,
});

const setOtp = (email, otp) => {
  otpStore.set(normalizeEmail(email), createOtpEntry(otp));
};

const getOtp = (email) => {
  const normalized = normalizeEmail(email);
  const entry = otpStore.get(normalized);

  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalized);
    return null;
  }

  return entry;
};

const deleteOtp = (email) => {
  otpStore.delete(normalizeEmail(email));
};

module.exports = {
  otpStore,
  normalizeEmail,
  setOtp,
  getOtp,
  deleteOtp,
};
