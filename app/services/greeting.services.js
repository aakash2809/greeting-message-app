const greetingModel = require('../models/greetingModel');
const logger = require("../../config/logger");

class GreetingServices {
    saveData = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.createMessage(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    retrieveData = (callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getAllMessages((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    retrieveDataById = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    removeDataById = (data, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.deleteDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    updateDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.updateData(greetingId, dataToReplace, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new GreetingServices