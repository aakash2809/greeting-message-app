const Greeting = require('./greeting.js');

class ApiMethods {
    createMessage(data, callback) {
        const greetingMessage = new Greeting({ message: data });
        greetingMessage.save((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllMessages(callback) {
        Greeting.find((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getDataById(data, callback) {
        Greeting.findById(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteDataById(data, callback) {
        Greeting.find(data, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    updateData(MessageId, dataToUpdate, callback) {
        Greeting.findByIdAndUpdate(MessageId, dataToUpdate, { new: true }, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);;
            }
        });
    }
}

module.exports = new ApiMethods;
