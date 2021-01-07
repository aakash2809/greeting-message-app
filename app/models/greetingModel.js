const mongoose = require(`mongoose`);
const logger = require("../../config/logger");

const greetingSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function (name) {
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

greetingSchema.set('versionKey', false);

logger.info('inside model');

const greetingModelInstance = mongoose.model(`greetingMessage`, greetingSchema);

class GreetingModel {
    saveGreeting = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        const greetingMessage = new greetingModelInstance(greetingData);
        greetingMessage.save((error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    getAllGreetings = (callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.find((error, greetingData) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingData);
            }
        });
    }

    getGreetingDataByGreetingId = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findById(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    deleteGreetingDataByGreetingId(greetingData, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findByIdAndDelete(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    updateGreetingDataGreetingId(MessageId, dataToUpdate, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findByIdAndUpdate(MessageId, dataToUpdate, { new: true }, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);;
            }
        });
    }
}

module.exports = new GreetingModel;
