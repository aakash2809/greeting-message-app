const Greeting = require('../models/greetingModel');
const logger = require("../../config/logger");

class GreetingServiceMethods {
    saveData = (data, callback) => {
        logger.info(`inside serivces,saveData method invoked`);
        logger.info(`calling to createMessage method of model`);

        Greeting.createMessage(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    retrieveData = (callback) => {
        logger.info(`inside serivces,retrieveData method invoked`);
        logger.info(`invoking to getAllMessages method of model`);

        Greeting.getAllMessages((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    retrieveDataById = (data, callback) => {
        logger.info(`inside serivces,retrieveDataById method invoked`);
        logger.info(`invoking to getDataById method of model`);

        Greeting.getDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    removeDataById = (data, callback) => {
        logger.info(`inside serivces,removeDataById method invoked`);
        logger.info(`invoking to deleteDataById method of model`);

        Greeting.deleteDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    updateDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`inside serivces,removeDataById method invoked`);
        logger.info(`invoking to deleteDataById method of model`);

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