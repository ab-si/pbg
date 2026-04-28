const express = require('express');
const router = express.Router();
const SurveyResponse = require('../models/SurveyResponse');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const { name, availability, gamePreferences, foodPreference, snacks, drinks } = req.body;

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
    res.status(201).json({ message: 'Response saved!', id: response._id });
  } catch (err) {
    console.error('Error saving response:', err);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const responses = await SurveyResponse.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (err) {
    console.error('Error fetching responses:', err);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await SurveyResponse.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Response not found' });
    }
    res.json({ message: 'Response deleted' });
  } catch (err) {
    console.error('Error deleting response:', err);
    res.status(500).json({ error: 'Failed to delete response' });
  }
});

module.exports = router;
