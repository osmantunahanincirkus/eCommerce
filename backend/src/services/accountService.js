const express = require('express');
const cors = require('cors');
const accountRoutes = require('../routes/accountRoutes');
const connectDB = require('../config/database');

const start = () => {
  const app = express();
  const port = 3001;

  app.use(cors());
  app.use(express.json());

  connectDB();

  app.use('/api/accounts', accountRoutes);

  app.listen(port, () => {
    console.log(`Account service running on port ${port}`);
  });
};

module.exports = { start };
