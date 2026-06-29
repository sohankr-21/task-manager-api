const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));