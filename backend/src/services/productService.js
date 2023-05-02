const express = require('express');
const cors = require('cors');
const productRoutes = require('../routes/productRoutes');
const connectDB = require('../config/database');

const start = () => {
  const app = express();
  const port = 3002;

  app.use(cors());
  app.use(express.json());

  connectDB();

  app.use('/api/products', productRoutes);

  app.listen(port, () => {
    console.log(`Product service running on port ${port}`);
  });
};

module.exports = { start };
