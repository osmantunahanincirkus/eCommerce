const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4003;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});
