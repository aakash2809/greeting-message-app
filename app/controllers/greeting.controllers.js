const services = require(`../services/greeting.services`)

class GrettingControllerMethods{
//Create and Save message
create = (req, res) => {
    services.saveData(req.body.message, (err, result) => {
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
findAll = (req, res) => {
    services.retrieveData((err, result) => {
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
findOne = (req, res) => {
    services.retrieveDataById(req.params.messageId, (err, result) => {
        if (result === null) {
            res.status(404).send({
                message: `greeting message not found with id ${req.params.messageId}`
            });
        } else {
            res.send(result);
        }
    })
};

update = (req, res) => {
    services.updateDataById(req.params.messageId,
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
delete = (req, res) => {
    services.removeDataById(req.params.messageId, (err, result) => {
        if (result === null) {
            res.status(404).send({
                message: `greeting message not found with id ${req.params.messageId}`
            });
        } else {
            res.send({ message: 'message deleted successfully! ' });
        }
    })
}

}

module.exports = new GrettingControllerMethods