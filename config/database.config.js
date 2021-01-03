const mongoose = require('mongoose');
const logger = require('./logger');
require(`dotenv`).config();

module.exports = () => {
    //Connecting to the database
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
    }).then(() => {
        logger.info(`Successfully connected to the database`,'info.log');
    }).catch(err => {
        logger.info(`Could not connect to the database. Exiting now... ${err}`,'info.log');
        process.exit();
    });
}

