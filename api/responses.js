const { connectToDatabase, SurveyResponse } = require('./_lib/db');
const { requireAdmin } = require('./_lib/auth');
const { parseJsonBody } = require('./_lib/request');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    await connectToDatabase();

    if (req.method === 'POST') {
      const body = parseJsonBody(req);
      const { name, availability, gamePreferences, foodPreference, snacks, drinks } = body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const response = new SurveyResponse({
        name: name.trim(),
        availability: availability || [],
        gamePreferences: gamePreferences || [],
        foodPreference: foodPreference || '',
        snacks: snacks || '',
        drinks: drinks || '',
      });

      await response.save();
      return res.status(201).json({ message: 'Response saved!', id: response._id });
    }

    if (req.method === 'GET') {
      if (!requireAdmin(req, res)) {
        return;
      }

      const responses = await SurveyResponse.find().sort({ createdAt: -1 });
      return res.status(200).json(responses);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling /api/responses:', error);
    return res.status(500).json({ error: 'Failed to handle response request' });
  }
};