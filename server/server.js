const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth'); // Assuming your routes are in a file named auth.js
const connectDB = require('./config/connectDB');
require('dotenv').config();
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use('/api/auth', authRoutes); // Use the authRoutes for authentication
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send({ status: 'server is running' });
});

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged error : ${err}`);
    server.close(() => process.exit(1));
});
