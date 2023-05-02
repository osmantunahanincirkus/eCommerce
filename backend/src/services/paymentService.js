const express = require('express');
const cors = require('cors');
const paymentRoutes = require('../routes/paymentRoutes');
const connectDB = require('../config/database');

const start = () => {
  const app = express();
  const port = 3003;

  app.use(cors());
  app.use(express.json());

  connectDB();

  app.use('/api/payments', paymentRoutes);

  app.listen(port, () => {
    console.log(`Payment service running on port ${port}`);
  });
};

module.exports = { start };
