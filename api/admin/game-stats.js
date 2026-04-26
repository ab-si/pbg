const { connectToDatabase, SurveyResponse } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAdmin(req, res)) {
    return;
  }

  try {
    await connectToDatabase();

    const responses = await SurveyResponse.find({}, 'gamePreferences').lean();
    const counts = {};

    responses.forEach((response) => {
      (response.gamePreferences || []).forEach((game) => {
        const key = game.trim();
        if (key) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });

    const sorted = Object.entries(counts)
      .map(([game, votes]) => ({ game, votes }))
      .sort((left, right) => right.votes - left.votes);

    return res.status(200).json(sorted);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return res.status(500).json({ error: 'Failed to fetch game stats' });
  }
};