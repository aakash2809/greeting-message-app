const Greeting = require('../models/greetingModel');
const logger = require("../../config/logger");

class GreetingServiceMethods {
    saveData = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');
        logger.info(`INVOKED: saveData`, 'info.log');
        logger.info(`INVOKING: createMessage method of models`, 'info.log');

        Greeting.createMessage(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    retrieveData = (callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');
        logger.info(`INVOKED: retrieveData`, 'info.log');
        logger.info(`INVOKING: getAllMessages method of models`, 'info.log');

        Greeting.getAllMessages((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    retrieveDataById = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');
        logger.info(`INVOKED: retrieveDataById`, 'info.log');
        logger.info(`INVOKING: getDataById method of models`, 'info.log');

        Greeting.getDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    removeDataById = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');
        logger.info(`INVOKED: removeDataById`, 'info.log');
        logger.info(`INVOKING: deleteDataById method of models`, 'info.log');

        Greeting.deleteDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    updateDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');
        logger.info(`INVOKED: updateDataById`, 'info.log');
        logger.info(`INVOKING: updateData method of models`, 'info.log');

        Greeting.updateData(greetingId, dataToReplace, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new GreetingServiceMethods