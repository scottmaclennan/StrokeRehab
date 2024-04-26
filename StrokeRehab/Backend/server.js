// server.js

const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

// Dummy exercises data (replace with database integration)
const exercises = [
  { id: 1, title: 'Push-ups', description: 'Do 20 push-ups from the wall' },
  { id: 2, title: 'Fast walking', description: 'Fast walk for 15 mins' },
];

// API endpoint to get exercises
app.get('/exercises', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM exercises');
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error('Error fetching exercises:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


