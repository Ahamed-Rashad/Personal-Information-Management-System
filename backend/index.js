const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const { PORT, DB_URL } = require('./config/.env');
const authRoutes = require('./routes/authRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

// Use environment variables
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const secretKey = process.env.SECRET_KEY;

mongoose.connect("mongodb://127.0.0.1:27017/pims_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
