const mongoose = require(`mongoose`);
const logger = require("../../config/logger");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    },
);

MessageSchema.set('versionKey', false);

logger.info('inside model');

const Greeting = mongoose.model(`greetingMessage`, MessageSchema);

class GreetingMethods {
    createMessage = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED: createMessage`, 'info.log');
        const greetingMessage = new Greeting(data);
        greetingMessage.save((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllMessages = (callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED:  getAllMessages`, 'info.log');

        Greeting.find((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getDataById = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED:  getDataById`, 'info.log');

        Greeting.findById(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteDataById(data, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED:  deleteDataById`, 'info.log');

        Greeting.findByIdAndDelete(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    updateData(MessageId, dataToUpdate, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED:  getDataById`, 'info.log');

        Greeting.findByIdAndUpdate(MessageId, dataToUpdate, { new: true }, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);;
            }
        });
    }
}

module.exports = new GreetingMethods;
