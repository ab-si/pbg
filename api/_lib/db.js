const mongoose = require('mongoose');
const SurveyResponse = require('../../server/models/SurveyResponse');

const DATABASE_NAME = process.env.MONGO_DB_NAME || 'hobby';

const cache = globalThis.__pbgMongoCache || {
  connection: null,
  connectionPromise: null,
  didDropLegacyIndex: false,
};

globalThis.__pbgMongoCache = cache;

async function dropLegacySurveyIndexes() {
  if (cache.didDropLegacyIndex) {
    return;
  }

  const indexes = await SurveyResponse.collection.indexes();
  const hasLegacyResponseIdIndex = indexes.some((index) => index.name === 'responseId_1' && index.unique);

  if (hasLegacyResponseIdIndex) {
    await SurveyResponse.collection.dropIndex('responseId_1');
    console.log('Removed legacy unique index responseId_1 from surveyresponses');
  }

  cache.didDropLegacyIndex = true;
}

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured');
  }

  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.connectionPromise) {
    cache.connectionPromise = mongoose
      .connect(process.env.MONGO_URI, { dbName: DATABASE_NAME })
      .then(async (connection) => {
        await dropLegacySurveyIndexes();
        return connection;
      })
      .catch((error) => {
        cache.connectionPromise = null;
        throw error;
      });
  }

  cache.connection = await cache.connectionPromise;
  return cache.connection;
}

module.exports = {
  DATABASE_NAME,
  SurveyResponse,
  connectToDatabase,
};