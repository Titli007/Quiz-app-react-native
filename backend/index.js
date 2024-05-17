const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db')
const router = require('./routes/quizRoutes')

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

connectDB()



// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App API!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
