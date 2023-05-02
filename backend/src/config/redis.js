const redis = require('redis');
const { REDIS_URL } = process.env;

const client = redis.createClient(REDIS_URL);

client.on('connect', () => {
  console.log('Redis connected');
});

client.on('error', (error) => {
  console.error('Redis connection error:', error);
});

module.exports = client;
