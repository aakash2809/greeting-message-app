const Greeting = require('../models/greetingMethods.js');

exports.saveData = (data, callback) => {
    //console.log(data);
    Greeting.createMessage(data, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
        }
    })
}



