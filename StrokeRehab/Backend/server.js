// Import the Express library to create the HTTP server
const express = require('express');
// Instantiate the Express application
const app = express();
// Define the port on which the server will listen
const PORT = 3000;

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Temporary in-memory data store for exercises (for demonstration purposes, replace with actual database interaction)
const exercises = [
  { id: 1, title: 'Push-ups', description: 'Do 20 push-ups from the wall' },
  { id: 2, title: 'Fast walking', description: 'Fast walk for 15 mins' },
];

// GET endpoint to retrieve exercises
// Ideally, this should fetch data from a real database
app.get('/exercises', async (req, res) => {
    try {
      // Here, 'pool' should be a connection pool instance (not shown here for brevity)
      const client = await pool.connect();
      // Execute a query to fetch all exercises
      const result = await client.query('SELECT * FROM exercises');
      // Send the results as a JSON response
      res.json(result.rows);
      // Release the database connection back to the pool
      client.release();
    } catch (error) {
      // Log and send error details if something goes wrong
      console.error('Error fetching exercises:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// POST endpoint to save a meal plan
// This is a placeholder that should be integrated with actual database logic
app.post('/saveMealPlan', (req, res) => {
  const mealPlan = req.body;
  // Ideally, insert mealPlan into a database here
  res.send({ status: 'Meal plan saved!' });
});

// In-memory array to store medication data
let medications = [];

// POST endpoint to add a new medication entry
app.post('/medications', (req, res) => {
  const medication = req.body;
  // Log the new medication to the console
  console.log('Adding new medication:', medication);
  // Add the new medication to the array
  medications.push(medication);
  // Respond with success message
  res.status(200).send({ message: 'Medication added successfully!' });
});

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



