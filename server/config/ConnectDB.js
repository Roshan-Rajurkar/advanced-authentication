const mongoose = require('mongoose')
require('dotenv').config();

const MONGOURI = process.env.MONGOURI

const ConnectDB = async () => {
    const response = await mongoose.connect(MONGOURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    console.log(response.connection.host);
}

module.exports = ConnectDB;