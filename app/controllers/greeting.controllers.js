const logger = require("../../config/logger");
const greetingServices = require(`../services/greeting.services`);
const greetingSchema = require('../middlewares/validation/greeting.schema');

class GreetingController {
    //Create and Save message
    addGreeting = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');

        let schemaValidationResult = greetingSchema.validate(request.body)
        if (schemaValidationResult.error) {
            logger.error(`SCHEMAERROR: Request did not match with schema `, 'error.log');
            response.send({
                success: false,
                status_code: 400,
                message: schemaValidationResult.error.details[0].message,
            })
            return;
        }

        const greetingDetails = {
            name: request.body.name,
            message: request.body.message
        };

        logger.info(`INVOKING: saveData method of services`, 'info.log');

        greetingServices.saveGreetingData(greetingDetails, (error, greetingResult) => {
            if (error) {
                response.send({
                    success: false,
                    status_code: 400,
                    message: error.message,
                });
                logger.error(`ERR001: Greeting message data did not match `, 'error.log');
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: 'data inserted successfully',
                    data: greetingResult
                })
                logger.info('SUCCESS001: data inserted successfully', 'info.log');
            }
        })
    };

    //Retrieve and return all greeting message from the database.
    findAllGreetings = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');

        greetingServices.retrieveGreetingData((error, greetingResult) => {
            if (error) {
                response.send({
                    success: false,
                    status_code: 500,
                    message: error.message || `Some error occurred while retrieving greeting message.`
                });
                logger.error(`ERR002: Some error occurred while retrieving greeting message.`, 'error.log');
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: ' data has been retrieved',
                    data: greetingResult
                })

                logger.info('SUCCESS002:All data has been retrieved', 'info.log');
            }
        })
    };

    //Find a single message with a messageId.
    findGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');

        greetingServices.retrieveGreetingDataById(request.params.greetingId, (error, greetinResult) => {
            if (greetinResult === null) {
                response.send({
                    success: false,
                    status_code: 404,
                    message: `Greeting not found with id ${request.params.greetingId}`
                });

                logger.error(`ERR003: Greeting  not found with id ${request.params.greetingId}`);
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: 'data retrived',
                    data: greetinResult
                });

                logger.info('SUCCESS003: Data retrieved', 'info.log');
            }
        })
    };

    //update data by Id
    updateGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');

        let schemaValidationResult = greetingSchema.validate(request.body)
        if (schemaValidationResult.error) {
            logger.error(`SCHEMAERROR: Request did not match with schema `, 'error.log');
            response.send({
                success: false,
                status_code: 400,
                message: schemaValidationResult.error.details[0].message,
            })
            return;
        }

        greetingServices.updateDataById(request.params.greetingId, {
            name: request.body.name,
            message: request.body.message
        },
            (error, greetingResult) => {
                if (error) {
                    response.send({
                        success: false,
                        status_code: 404,
                        message: `Greeting not found with id ${request.params.greetingId}`
                    });
                    logger.error(`ERR004: Greeting  not found with id ${request.params.greetingId}`);
                } else {
                    response.send({
                        success: true,
                        status_code: 200,
                        message: 'Data has been updated',
                        updated_data: greetingResult
                    });
                    logger.info('SUCCESS004: Data has been updated', 'info.log');
                }
            });
    };

    //Delete a greeting message with the specified messageId in the request
    deleteGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`);

        greetingServices.removeDataById(request.params.greetingId, (error, greetingResult) => {
            if (greetingResult === null) {
                response.send({
                    success: false,
                    status_code: 404,
                    message: `greeting message not found with id ${request.params.greetingId}`
                });

                logger.error(`ERR005: greeting message not found with id ${request.params.greetingId}`);
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: 'greeting deleted successfully!'
                });

                logger.info('SUCCESS004: greeting deleted successfully!', 'info.log');
            }
        })
    }
}

module.exports = new GreetingController