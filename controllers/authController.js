const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Valid email and password required (min 6 characters)' });
  }

  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.json({ success: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  } finally {
    conn.release();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  } finally {
    conn.release();
  }
};

exports.me = (req, res) => {
  res.json({ message: 'Authenticated', user_id: req.userId });
};
