const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/v1/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
