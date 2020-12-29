const greetingMessage = require('./greeting.js');

class ApiMethods {
    createMessage(data, callback) {
        greetingMessage.save({ message: data.message }, (err, data) => {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        })
    }
}

module.exports = new ApiMethods;
