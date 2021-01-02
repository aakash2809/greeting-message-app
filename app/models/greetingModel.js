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

logger.info('inside model');

const Greeting = mongoose.model(`greetingMessage`, MessageSchema);

class GreetingMethods { 
      createMessage = (data, callback) => {
        logger.info('createMessage method invoked');
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
        logger.info('getAllMessages method invoked');
        Greeting.find((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getDataById = (data, callback) => {
        logger.info('getDataById method invoked');
        Greeting.findById(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteDataById(data, callback) {
        logger.info('deleteDataById method invoked');
        Greeting.findByIdAndDelete(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    updateData(MessageId, dataToUpdate, callback) {
        logger.info('updateData method invoked');
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
