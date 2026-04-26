const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const responsesRouter = require('./routes/responses');
const adminRouter = require('./routes/admin');
const SurveyResponse = require('./models/SurveyResponse');

const app = express();
const PORT = Number(process.env.SERVER_PORT || process.env.API_PORT || 5001);
const DATABASE_NAME = process.env.MONGO_DB_NAME || 'hobby';

async function dropLegacySurveyIndexes() {
  const indexes = await SurveyResponse.collection.indexes();
  const hasLegacyResponseIdIndex = indexes.some((index) => index.name === 'responseId_1' && index.unique);

  if (hasLegacyResponseIdIndex) {
    await SurveyResponse.collection.dropIndex('responseId_1');
    console.log('Removed legacy unique index responseId_1 from surveyresponses');
  }
}

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { dbName: DATABASE_NAME })
  .then(async () => {
    console.log(`✅ MongoDB connected to ${DATABASE_NAME}`);
    await dropLegacySurveyIndexes();
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/responses', responsesRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🎲 Board Game Night API is live!' });
});

app.listen(PORT, () => {
  console.log(`🎲 Server running on http://localhost:${PORT}`);
});
