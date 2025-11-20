import rateLimit from "express-rate-limit";

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per IP dalam 15 menit
  message: "Limit: Request limit exceeded",
});

const signInLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // 5 menit
  max: 5,  // Maksimal 5 percakapan login per IP
  message: "Limit: Request limit exceeded",
});

const signUpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 menit
  max: 2,  // Maksimal 2 percakapan register per IP
  message: "Limit: Request limit exceeded",
});

// Rate limiting untuk akses data (setelah login)
const dataLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 menit
  max: 50,  // Maksimal 50 request per menit untuk akses data
  message: 'Terlalu banyak permintaan data, coba lagi setelah beberapa menit',
});

// Rate limiting untuk upload gambar profil
const uploadLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,  // 1 jam
  max: 2,  // Maksimal 2 upload per pengguna per jam
  message: 'Anda hanya bisa mengunggah gambar profil dua kali dalam satu jam.',
});

export {
  defaultLimiter,
  signInLimiter,
  signUpLimiter,
};
