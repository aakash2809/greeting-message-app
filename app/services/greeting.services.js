const Greeting = require('../models/greetingMethods.js');

exports.saveData = (data, callback) => {
    Greeting.createMessage(data, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    })
}

exports.retrieveData = (callback) => {
    Greeting.getAllMessages((err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

exports.retrieveDataById = (data ,callback) => {
    Greeting.getDataById(data, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    })
}

exports.removeDataById = (data ,callback) => {
    Greeting.deleteDataById(data, (err,result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

exports.updateDataById = (MessageId, dataToReplace ,callback) => {
    Greeting.updateData(MessageId, dataToReplace , (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null);
        }
    })
}
