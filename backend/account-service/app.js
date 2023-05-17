const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const connectDB = require('./config/db');
const roleRoutes = require('./routes/roleRoutes');


const app = express();
const PORT = process.env.PORT || 4001;

connectDB();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/account', accountRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/roles', roleRoutes);

app.listen(PORT, () => {
  console.log(`Account service is running on port ${PORT}`);
});
