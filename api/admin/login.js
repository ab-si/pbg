const jwt = require('jsonwebtoken');
const { parseJsonBody } = require('../_lib/request');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseJsonBody(req);
  const { username, password } = body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const validUser = username === process.env.ADMIN_USERNAME;
  const validPass = password === process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return res.status(200).json({ token });
};