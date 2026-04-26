const { DATABASE_NAME, connectToDatabase } = require('./_lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    return res.status(200).json({ status: 'ok', database: DATABASE_NAME });
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({ status: 'error' });
  }
};