const Greeting = require('../models/greeting.js');

/**
 * @description Create and Save message
 */
exports.create = (req, res) => {
    //Validate request
    if (!req.body.message) {
        return res.status(400).send({
            message: ` greeting message can not be empty`
        });
    }

    //Create a greeting message
    const greetingMessage = new Greeting({
        message: req.body.message
    });

    //Save greeting message in the database
    greetingMessage.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while creating the message.`
            });
        });
};

/**
 * @description Retrieve and return all greeting message from the database.
 */
exports.findAll = (req, res) => {
    Greeting.find()
        .then(greetingMessage => {
            res.send(greetingMessage);
        }).catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving greeting message.`
            });
        });
};

/**
 * @description Find a single message with a messageId.
 */
exports.findOne = (req, res) => {
    Greeting.findById(req.params.messageId)
        .then(greetingMessage => {
            if (!greetingMessage) {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            res.send(greetingMessage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            return res.status(500).send({
                message: `Error retrieving greeting message with id ${req.params.messageId}`
            });
        });
};
