const Greeting = require('../models/greetingMethods.js');

exports.saveData = (data, callback) => {
    Greeting.createMessage(data, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
}



