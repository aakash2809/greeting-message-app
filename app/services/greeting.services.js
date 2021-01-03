const Greeting = require('../models/greetingModel');
const logger = require("../../config/logger");

class GreetingServiceMethods {
    saveData = (data, callback) => {
        logger.info(`inside serivces,saveData method invoked`,'info.log');
        logger.info(`calling to createMessage method of model`,'info.log');

        Greeting.createMessage(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    retrieveData = (callback) => {
        logger.info(`inside serivces,retrieveData method invoked`,'info.log');
        logger.info(`invoking to getAllMessages method of model`,'info.log');

        Greeting.getAllMessages((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    retrieveDataById = (data, callback) => {
        logger.info(`inside serivces,retrieveDataById method invoked`,'info.log');
        logger.info(`invoking to getDataById method of model`,'info.log');

        Greeting.getDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    removeDataById = (data, callback) => {
        logger.info(`inside serivces,removeDataById method invoked`,'info.log');
        logger.info(`invoking to deleteDataById method of model`,'info.log');

        Greeting.deleteDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    updateDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`inside serivces,removeDataById method invoked`,'info.log');
        logger.info(`invoking to deleteDataById method of model`,'info.log');

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