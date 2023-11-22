const express = require('express')
const app = express()
const auth = require('./routes/auth')
const ConnectDB = require('./config/ConnectDB')
require('dotenv').config();

const PORT = process.env.PORT || 5000
ConnectDB();

app.use(express.json());
app.use('/api/auth', auth)

const server = app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged error : ${err}`)
    server.close(() => process.exit(1));
})