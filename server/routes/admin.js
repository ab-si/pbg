const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SurveyResponse = require('../models/SurveyResponse');
const auth = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const validUser = username === process.env.ADMIN_USERNAME;
  const validPass = password === process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

// GET /api/admin/game-stats — aggregated vote counts per game, sorted by popularity
router.get('/game-stats', auth, async (req, res) => {
  try {
    const responses = await SurveyResponse.find({}, 'gamePreferences').lean();

    const counts = {};
    responses.forEach((r) => {
      (r.gamePreferences || []).forEach((g) => {
        const key = g.trim();
        if (key) counts[key] = (counts[key] || 0) + 1;
      });
    });

    const sorted = Object.entries(counts)
      .map(([game, votes]) => ({ game, votes }))
      .sort((a, b) => b.votes - a.votes);

    res.json(sorted);
  } catch (err) {
    console.error('Error fetching game stats:', err);
    res.status(500).json({ error: 'Failed to fetch game stats' });
  }
});

module.exports = router;
