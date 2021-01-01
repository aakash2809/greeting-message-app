const logger = require("../../config/logger");
const services = require(`../services/greeting.services`);

class GreetingControllerMethods {
    //Create and Save message
    create = (req, res) => {
        logger.info(`inside controller,create method invoked`);
        const createMessage = {
            name: req.body.name,
            message: req.body.message
        };

        logger.info(`invoking saveData method of services`);
        services.saveData(createMessage, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 400,
                    message: `greeting message can not be empty`,
                });
                logger.error(`greeting message can not be empty`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'data inserted successfully',
                    data: result
                })
                logger.info('data inserted successfully');
            }
        })

    };

    //Retrieve and return all greeting message from the database.
    findAll = (req, res) => {
        logger.info(`inside controller,findAll method invoked`);
        logger.info(`invoking retrieveData method of services`);

        services.retrieveData((err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 500,
                    message: err.message || `Some error occurred while retrieving greeting message.`
                });
                logger.error(`Some error occurred while retrieving greeting message.`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: ' data has been retrieved',
                    data: result
                })
                logger.info(' data has been retrieved');
            }
        })
    };

    //Find a single message with a messageId.
    findOne = (req, res) => {
        logger.info(`inside controller,findOne method invoked`);
        logger.info(`invoking retrieveDataById method of services`);

        services.retrieveDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${req.params.greetingId}`
                });
                logger.error(`greeting message not found with id ${req.params.greetingId}`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'data retrived',
                    data: result
                });
                logger.info('data retrieved');
            }
        })
    };
    //update data by Id
    update = (req, res) => {
        logger.info(`inside controller,update method invoked`);
        logger.info(`invoking updateDataById method of services`);

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
                    logger.error(`greeting message not found with id ${req.params.greetingId}`);
                } else {
                    res.send({
                        success: true,
                        status_code: 200,
                        message: 'data has been updated',
                        updated_data: result
                    });
                    logger.info('data has been updated');
                }
            });
    };

    //Delete a greeting message with the specified messageId in the request
    delete = (req, res) => {
        logger.info(`inside controller,delete method invoked`);
        logger.info(`invoking emoveDataById method of services`);

        services.removeDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${req.params.greetingId}`
                });
                logger.error(`greeting message not found with id ${req.params.greetingId}`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'message deleted successfully!'
                });
                logger.info('message deleted successfully!');
            }
        })
    }

}

module.exports = new GreetingControllerMethods