const jwt = require('jsonwebtoken');

function requireAdmin(req, res) {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — no token provided' });
    return false;
  }

  try {
    jwt.verify(header.slice(7), process.env.JWT_SECRET);
    return true;
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
    return false;
  }
}

module.exports = { requireAdmin };