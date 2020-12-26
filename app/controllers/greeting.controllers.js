const Greeting = require('../models/greeting.js');

/**
 * @description Create and Save message
 */
exports.create = (req, res) => {
    //Validate request
    if (!req.body.message) {
        return res.status(400).send({
            message: "Note content can not be empty"
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
                message: err.message || "Some error occurred while creating the message."
            });
        });
};

