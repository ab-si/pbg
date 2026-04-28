const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — no token provided' });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.admin) {
      return res.status(401).json({ error: 'Unauthorized — admin access required' });
    }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
