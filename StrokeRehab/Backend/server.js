// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

// Dummy exercises data (replace with database integration)
const exercises = [
  { id: 1, title: 'Push-ups', description: 'Do 20 push-ups from the wall' },
  { id: 2, title: 'Fast walking', description: 'Fast walk for 15 mins' },
];

// API endpoint to get exercises
app.get('/exercises', (req, res) => {
  res.json(exercises);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
