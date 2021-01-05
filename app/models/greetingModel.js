const mongoose = require(`mongoose`);
const logger = require("../../config/logger");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(name) {
              return /^[A-Z]{1}[a-zA-Z]{2,}$/.test(name);
            },
            message: () => `should have minimum length 3!`
          },
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

messageSchema.set('versionKey', false);

logger.info('inside model');

const greetingModelInstance = mongoose.model(`greetingMessage`, messageSchema);

class GreetingModel {
    createMessage = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');
        logger.info(`INVOKED: createMessage`, 'info.log');
        const greetingMessage = new greetingModelInstance(data);
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

        greetingModelInstance.find((err, data) => {
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

        greetingModelInstance.findById(data, (err, result) => {
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

        greetingModelInstance.findByIdAndDelete(data, (err, result) => {
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

        greetingModelInstance.findByIdAndUpdate(MessageId, dataToUpdate, { new: true }, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);;
            }
        });
    }
}

module.exports = new GreetingModel;
