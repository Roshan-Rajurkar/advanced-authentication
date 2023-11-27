const express = require('express')
const cors = require('cors')
const app = express()
const auth = require('./routes/auth')
const ConnectDB = require('./config/ConnectDB')
require('dotenv').config();
const errorHandler = require('./middlewares/error')

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000
ConnectDB();

app.use(express.json());
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