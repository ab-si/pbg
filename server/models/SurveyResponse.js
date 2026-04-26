const mongoose = require('mongoose');

const availabilitySlotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    timeSlots: [{ type: String }],
  },
  { _id: false }
);

const surveyResponseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  availability: [availabilitySlotSchema],
  gamePreferences: [{ type: String }],
  foodPreference: { type: String, default: '' },
  snacks: { type: String, default: '' },
  drinks: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.SurveyResponse || mongoose.model('SurveyResponse', surveyResponseSchema);
