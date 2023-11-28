const express = require('express')
const cors = require('cors')
const app = express()
const auth = require('./routes/auth')
const ConnectDB = require('./config/ConnectDB')
require('dotenv').config();
const errorHandler = require('./middlewares/error')
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000
ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', auth)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send({ status: 'server is running' })
})

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged error : ${err}`)
    server.close(() => process.exit(1));
})