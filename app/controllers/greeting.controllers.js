/**
 * @module       controllers
 * @description  controllers is reponsible to accept request and send the response
 *               Controller resolve the error using the service layer by invoking its services
 * @requires     greetingServices is a refernce for invoking the services of service layer
 * @requires     greetingSchema   is a reference for the joi validation
 * @requires     logger           is a reference to save logs in log files
 * @author       Aakash Rajak <aakashrajak2809@gmail.com>
 * @since        24/12/2020
-----------------------------------------------------------------------------------------------*/

const logger           = require("../../config/logger");
const greetingServices = require(`../services/greeting.services`);
const greetingSchema   = require('../middlewares/validation/greeting.schema.joi.validator');
 const losash          =  require('lodash');
class GreetingController {
    /**
     * @description add greeting to database
     * @param {*} request takes greeting in json formate
     * @param {*} response sends response from server
    */
    addGreeting = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`);

        let requestValidationResult = greetingSchema.validate(request.body)
        if (requestValidationResult.error) {
            logger.error(`SCHEMAERROR: Request did not match with schema `);
            response.send({
                success: false,
                status_code: 400,
                message: requestValidationResult.error.details[0].message,
            })
            return;
        }

        const greetingDetails = {
            name: request.body.name,
            message: request.body.message
        };

        logger.info(`INVOKING: saveData method of services`);

        greetingServices.saveGreetingData(greetingDetails, (error, greetingResult) => {
            if (error) {
                response.send({
                    success: false,
                    status_code: 400,
                    message: error.message,
                });
                logger.error(`ERR001: Greeting message data did not match `);
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: 'data inserted successfully',
                    data: greetingResult
                })
                logger.info('SUCCESS001: data inserted successfully');
            }
        })
    };


    /**
     * @description Retrieve and return all greetings from the database.
     * @param {*} request does not take any parameter
     * @param {*} response sends response from server
    */
    findAllGreetings = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`);

        greetingServices.retrieveGreetingData((error, greetingResult) => {
            if (error) {
                response.send({
                    success: false,
                    status_code: 500,
                    message: error.message || `Some error occurred while retrieving greeting message.`
                });
                logger.error(`ERR002: Some error occurred while retrieving greeting message.`);
            } else {
                response.send({
                    success: true,
                    status_code: 200,
                    message: ' data has been retrieved',
                    data: greetingResult
                })

                logger.info('SUCCESS002:All data has been retrieved');
            }
        })
    };

    /**
     * @description Retrieve and return greeting associated with _id ,from the database.
     * @param {*} request takes _id that is greetingID
     * @param {*} response sends response from server
    */
    findGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`);

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

                logger.info('SUCCESS003: Data retrieved');
            }
        })
    };

    /**
     * @description update greeting data by _id
     * @param {*} request takes _id that is greetingID
     * @param {*} response sends response from server
    */
    updateGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`, 'info.log');

        let schemaValidationResult = greetingSchema.validate(request.body)
        if (schemaValidationResult.error) {
            logger.error(`SCHEMAERROR: Request did not match with schema `);
            response.send({
                success: false,
                status_code: 400,
                message: schemaValidationResult.error.details[0].message,
            })
            return;
        }

        greetingServices.updateGreetingDataById(request.params.greetingId, {
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
                    logger.info('SUCCESS004: Data has been updated');
                }
            });
    };

    /**
     * @description delete greeting  by _id that is greetingId
     * @param {*} request takes _id that is greetingID
     * @param {*} response sends response from server
    */
    deleteGreetingByGreetingId = (request, response) => {
        logger.info(`TRACKED_PATH: Inside controller`);

        greetingServices.removeGreetingDataById(request.params.greetingId, (error, greetingResult) => {
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

                logger.info('SUCCESS004: greeting deleted successfully!');
            }
        })
    }
}

module.exports = new GreetingController