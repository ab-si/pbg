const { connectToDatabase, SurveyResponse } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAdmin(req, res)) {
    return;
  }

  try {
    await connectToDatabase();

    const { id } = req.query;
    const deleted = await SurveyResponse.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Response not found' });
    }

    return res.status(200).json({ message: 'Response deleted' });
  } catch (error) {
    console.error('Error deleting response:', error);
    return res.status(500).json({ error: 'Failed to delete response' });
  }
};
