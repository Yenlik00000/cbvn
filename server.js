// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Sample database (just an in-memory array for this example)
let users = [];

// POST route to create a new user
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Store user data (for the sake of the example, we just push it to the array)
    const newUser = { name, email, password };
    users.push(newUser);

    // Respond with the created user (you can exclude password in production)
    res.status(201).json({
        message: "User registered successfully",
        user: { name, email },
    });
});

// GET route to fetch all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
