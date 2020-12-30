const Greeting = require('../models/greetingMethods');

class GreetingServiceMethods {
    saveData = (data, callback) => {
        Greeting.createMessage(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    retrieveData = (callback) => {
        Greeting.getAllMessages((err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        })
    }

    retrieveDataById = (data, callback) => {
        Greeting.getDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result);
            }
        })
    }

    removeDataById = (data, callback) => {
        Greeting.deleteDataById(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    updateDataById = (MessageId, dataToReplace, callback) => {
        Greeting.updateData(MessageId, dataToReplace, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null);
            }
        })
    }
}

module.exports = new GreetingServiceMethods