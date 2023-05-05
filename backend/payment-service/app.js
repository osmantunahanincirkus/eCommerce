const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4002;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});
