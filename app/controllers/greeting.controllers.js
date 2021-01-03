const logger = require("../../config/logger");
const services = require(`../services/greeting.services`);

class GreetingControllerMethods {
    //Create and Save message
    create = (req, res) => {
        logger.info(`inside controller,create method invoked`,'info.log');
        const createMessage = {
            name: req.body.name,
            message: req.body.message
        };

        logger.info(`invoking saveData method of services`,'info.log');
        services.saveData(createMessage, (err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 400,
                    message: `greeting message can not be empty`,
                });
                logger.error(`ERR005: greeting message can not be empty `, 'error.log');
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'data inserted successfully',
                    data: result
                })
                logger.info('data inserted successfully','info.log');
            }
        })

    };

    //Retrieve and return all greeting message from the database.
    findAll = (req, res) => {
        logger.info(`inside controller,findAll method invoked`,'info.log');
        logger.info(`invoking retrieveData method of services`,'info.log');

        services.retrieveData((err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 500,
                    message: err.message || `Some error occurred while retrieving greeting message.`
                });
                logger.error(`Some error occurred while retrieving greeting message.`,'error.log');
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: ' data has been retrieved',
                    data: result
                })
                logger.info(' data has been retrieved','info.log');
            }
        })
    };

    //Find a single message with a messageId.
    findOne = (req, res) => {
        logger.info(`inside controller,findOne method invoked`,'info.log');
        logger.info(`invoking retrieveDataById method of services`,'info.log');

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
                logger.info('data retrieved','info.log');
            }
        })
    };
    //update data by Id
    update = (req, res) => {
        logger.info(`inside controller,update method invoked`,'info.log');
        logger.info(`invoking updateDataById method of services`,'info.log');

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
                    logger.info('data has been updated','info.log');
                }
            });
    };

    //Delete a greeting message with the specified messageId in the request
    delete = (req, res) => {
        logger.info(`inside controller,delete method invoked`,'info.log');
        logger.info(`invoking emoveDataById method of services`,'info.log');

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
                logger.info('message deleted successfully!','info.log');
            }
        })
    }

}

module.exports = new GreetingControllerMethods