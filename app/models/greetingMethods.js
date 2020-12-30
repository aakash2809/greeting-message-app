const mongoose = require(`mongoose`);
const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
})

const Greeting = mongoose.model(`greetingMessage`, MessageSchema)

class ApiMethods {
    createMessage = (data, callback) => {
        const greetingMessage = new Greeting({ message: data });
        greetingMessage.save((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllMessages = (callback) => {
        Greeting.find((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getDataById = (data, callback) => {
        Greeting.findById(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteDataById(data, callback) {
        Greeting.findByIdAndDelete(data, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
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
