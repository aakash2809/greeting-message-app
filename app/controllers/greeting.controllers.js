const logger = require("../../config/logger");
const services = require(`../services/greeting.services`);
const Joi = require('joi');

class GreetingControllerMethods {
    //Create and Save message
    create = (req, res) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');
        logger.info(`INVOKED: Create method `, 'info.log');
        
        const schema = Joi.object({
            name: Joi.string().required(),
            message: Joi.string().required(),
        })

        let result = schema.validate(req.body)
        if(result.error){
            res.status(400).send(result.error.details[0])
            return ;
        }
               
            const createMessage = {
                name: req.body.name,
                message: req.body.message
            };

            logger.info(`INVOKING: saveData method of services`, 'info.log');
            services.saveData(createMessage, (err, result) => {
                if (err) {
                    res.send({
                        success: false,
                        status_code: 400,
                        message: `greeting message can not be empty`,
                    });
                    logger.error(`ERR001: Greeting message can not be empty `, 'error.log');
                } else {
                    res.send({
                        success: true,
                        status_code: 200,
                        message: 'data inserted successfully',
                        data: result
                    })
                    logger.info('SUCCESS001: data inserted successfully', 'info.log');
                }
            })
        

    };

    //Retrieve and return all greeting message from the database.
    findAll = (req, res) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');
        logger.info(`INVOKED: findAll`, 'info.log');
        logger.info(`INVOKING: saveData method of services`, 'info.log');

        services.retrieveData((err, result) => {
            if (err) {
                res.send({
                    success: false,
                    status_code: 500,
                    message: err.message || `Some error occurred while retrieving greeting message.`
                });
                logger.error(`ERR002: Some error occurred while retrieving greeting message.`, 'error.log');
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: ' data has been retrieved',
                    data: result
                })
                logger.info('SUCCESS002:All data has been retrieved', 'info.log');
            }
        })
    };

    //Find a single message with a messageId.
    findOne = (req, res) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');
        logger.info(`INVOKED: findOne`, 'info.log');
        logger.info(`INVOKING: retrieveDataById method of services`, 'info.log');

        services.retrieveDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `Greeting not found with id ${req.params.greetingId}`
                });
                logger.error(`ERR003: Greeting  not found with id ${req.params.greetingId}`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'data retrived',
                    data: result
                });
                logger.info('SUCCESS003: Data retrieved', 'info.log');
            }
        })
    };
    //update data by Id
    update = (req, res) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');
        logger.info(`INVOKED: Update method`, 'info.log');

        const schema = Joi.object({
            name: Joi.string().required(),
            message: Joi.string().required(),
        })

        let result = schema.validate(req.body)
        if(result.error){
            res.status(400).send(result.error.details[0])
            return ;
        }
        
            logger.info(`INVOKING: UpdateDataById method of services`, 'info.log');

            services.updateDataById(req.params.greetingId, {
                name: req.body.name,
                message: req.body.message
            },
                (err, result) => {
                    if (err) {
                        res.send({
                            success: false,
                            status_code: 404,
                            message: `Greeting not found with id ${req.params.greetingId}`
                        });
                        logger.error(`ERR004: Greeting  not found with id ${req.params.greetingId}`);
                    } else {
                        res.send({
                            success: true,
                            status_code: 200,
                            message: 'Data has been updated',
                            updated_data: result
                        });
                        logger.info('SUCCESS004: Data has been updated', 'info.log');
                    }
                });
        
    };

    //Delete a greeting message with the specified messageId in the request
    delete = (req, res) => {
        logger.info(`TRACKED_PATH: Inside controller`);
        logger.info(`INVOKED: delete method`, 'info.log');
        logger.info(`INVOKING: removeDataById method of services`, 'info.log');

        services.removeDataById(req.params.greetingId, (err, result) => {
            if (result === null) {
                res.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${req.params.greetingId}`
                });
                logger.error(`ERR005: greeting message not found with id ${req.params.greetingId}`);
            } else {
                res.send({
                    success: true,
                    status_code: 200,
                    message: 'message deleted successfully!'
                });
                logger.info('SUCCESS004: Message deleted successfully!', 'info.log');
            }
        })
    }

}

module.exports = new GreetingControllerMethods