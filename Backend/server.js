require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use('/', courseRoutes);

const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/', enrollmentRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/', adminRoutes);

const lessonRoutes = require('./routes/lessonRoutes');
app.use('/', lessonRoutes);

app.get('/', (req, res) => {
  res.send('LearnHub API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));