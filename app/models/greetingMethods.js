const Greeting = require('./greeting.js');

class ApiMethods {
    createMessage(data, callback) {
        console.log(data);
        const greetingMessage = new Greeting({message: data });
        greetingMessage.save({}, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    }
}

module.exports = new ApiMethods;
