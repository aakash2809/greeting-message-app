const greetingModel = require('../models/greetingModel');
const logger = require("../../config/logger");

class GreetingServices {
    saveGreetingData = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.saveGreeting(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult);
            }
        })
    }

    retrieveGreetingData = (callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getAllGreetings((error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        })
    }

    retrieveGreetingDataById = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getGreetingDataByGreetingId(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult);
            }
        })
    }

    removeDataById = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.deleteGreetingDataByGreetingId(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult)
            }
        })
    }

    updateDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.updateGreetingDataGreetingId(greetingId, dataToReplace, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult)
            }
        })
    }
}

module.exports = new GreetingServices