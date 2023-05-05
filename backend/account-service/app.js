const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4001;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/account', accountRoutes);

app.listen(PORT, () => {
  console.log(`Account service is running on port ${PORT}`);
});
