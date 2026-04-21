const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.ADMIN_JWT_SECRET;

  if (!adminUsername || !adminPassword || !jwtSecret) {
    return res.status(500).json({
      success: false,
      message: 'Konfigurasi admin login belum lengkap di backend .env'
    });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Username atau password admin salah'
    });
  }

  const token = jwt.sign(
    { role: 'admin', username: adminUsername },
    jwtSecret,
    { expiresIn: '8h' }
  );

  return res.status(200).json({
    success: true,
    data: {
      token
    }
  });
});

module.exports = router;
