const servises = require(`../services/greeting.services.js`)

//Create and Save message
exports.create = (req, res) => {
    servises.saveData(req.body.message, (err, result) => {
        if (err) {
            res.status(400).send({
                message: `greeting message can not be empty`
            });
        } else {
            res.status(200).send(result)
        }
    })

};

//Retrieve and return all greeting message from the database.
exports.findAll = (req, res) => {
    servises.retrieveData((err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving greeting message.`
            });
        } else {
            res.status(200).send(result)
        }
    })
};

//Find a single message with a messageId.
exports.findOne = (req, res) => {
    servises.retrieveDataById(req.params.messageId, (err, result) => {
        if (result === null) {
            res.status(404).send({
                message: `greeting message not found with id ${req.params.messageId}`
            });
        } else {
            res.send(result);
        }
    })
};

exports.update = (req, res) => {
    servises.updateDataById(req.params.messageId,
        { message: req.body.message },
        (err, result) => {
            if (err) {
                res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            } else {
                res.send(result);
            }
        });
};

//Delete a greeting message with the specified messageId in the request
exports.delete = (req, res) => {
    servises.removeDataById(req.params.messageId, (err,result) => {
        if (result === null) {
            res.status(404).send({
                message: `greeting message not found with id ${req.params.messageId}`
            });
        } else {
            res.send({ message: 'message deleted successfully! ' });
        }
    })
};
