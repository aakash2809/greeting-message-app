const services = require(`../services/greeting.services`);

class GreetingControllerMethods {
    //Create and Save message
    create = (req, res) => {
        const createMessage = {
            name: req.body.name,
            message: req.body.message
        };
        services.saveData(createMessage, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 400,
                    message: `greeting message can not be empty`,
                });
            } else {
                res.send({
                    success: true,
                    status_code: 200,
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
                    success: false,
                    status_code: 500,
                    message: err.message || `Some error occurred while retrieving greeting message.`
                });
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message:'status data has been retrieved',
                    data: result
                })
            }
        })
    };

    //Find a single message with a messageId.
    findOne = (req, res) => {
        services.retrieveDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${req.params.greetingId}`
                });
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'data retrived',
                    data: result
                });
            }
        })
    };
    //update data by Id
    update = (req, res) => {
        services.updateDataById(req.params.greetingId, {
            name: req.body.name,
            message: req.body.message
        },
            (err, result) => {
                if (err) {
                    res.send({
                        success: false,
                        status_code: 404,
                        message: `greeting message not found with id ${req.params.greetingId}`
                    });
                } else {
                    res.send({
                        success: true,
                        status_code: 200,
                        message: 'data has been updated',
                        updated_data: result
                    });
                }
            });
    };

    //Delete a greeting message with the specified messageId in the request
    delete = (req, res) => {
        services.removeDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${req.params.greetingId}`
                });
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'message deleted successfully!'
                });
            }
        })
    }

}

module.exports = new GreetingControllerMethods