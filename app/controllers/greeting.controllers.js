const services = require(`../services/greeting.services`)
const Greeting = require('../models/greetingSchema')

class GreetingControllerMethods {
    //Create and Save message
    create = (req, res) => {
        const createMessage = new Greeting({
            name: req.body.name,
            message: req.body.message
        });
        services.saveData(createMessage, (err, result) => {
            if (err) {
                res.send({
                    success_status: 'false',
                    error_code: 400,
                    message: `greeting message can not be empty`,
                });
            } else {
                res.send({
                    success_status: 'true',
                    success_code: 200,
                    message: 'data inserted successfully',
                    data: result
                })
            }
        })

    };

    //Retrieve and return all greeting message from the database.
    findAll = (req, res) => {
        services.retrieveData((err, result) => {
            if (err) {
                res.status(500).send({
                    success_status: 'false',
                    error_code: 500,
                    message: err.message || `Some error occurred while retrieving greeting message.`
                });
            } else {
                res.send({
                    success_status: 'true',
                    success_code: 200,
                    data: result
                })
            }
        })
    };

    //Find a single message with a messageId.
    findOne = (req, res) => {
        services.retrieveDataById(req.params.messageId, (err, result) => {
            if (result === null) {
                res.status(404).send({
                    success_status: 'false',
                    error_code: 404,
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            } else {
                res.send(result);
            }
        })
    };
    //update data by Id
    update = (req, res) => {
        services.updateDataById(req.params.messageId, {
            name: req.body.name,
            message: req.body.message
        },
            (err, result) => {
                if (err) {
                    res.status(404).send({
                        success_status: 'false',
                        error_code: 404,
                        message: `greeting message not found with id ${req.params.messageId}`
                    });
                } else {
                    res.send({
                        success_status: 'true',
                        success_code: 200,
                        message: 'data has been updated',
                        updated_data: result
                    });
                }
            });
    };

    //Delete a greeting message with the specified messageId in the request
    delete = (req, res) => {
        services.removeDataById(req.params.messageId, (err, result) => {
            if (result === null) {
                res.send({
                    success_status: 'false',
                    error_code: 404,
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            } else {
                res.send({
                    success_status: 'true',
                    success_code: 200,
                    message: 'message deleted successfully!'
                });
            }
        })
    }

}

module.exports = new GreetingControllerMethods