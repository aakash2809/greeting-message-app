/**
 * @module         services
 * @file           greeting.services.js
 * @description    This file contain all the service method for greetings
 * @requires       greetingModel  is refrence to invoke methods of greetingModel.js     
 * @author         Aakash Rajak <aakashrajak2809@gmail.com>
 * @since          24/12/2020          
------------------------------------------------------------------------------------------*/
const greetingModel = require('../models/greetingModel');
const logger        = require("../../config/logger");

class GreetingServices {
    /**
     * @description save request data to database using model methods
     * @param {*} greetingData holds data to be saved in json formate
     * @param {*} callback holds a function 
    */
    saveGreetingData = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.saveGreeting(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult);
            }
        })
    }

    /**
     * @description retrive all greeting data from database using model's mothod
     * @param {*} callback holds a function 
    */
    retrieveGreetingData = (callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getAllGreetings((error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        })
    }

    /**
      * @description retrive one greeting data from database using model's mothod
      * @param {*} greetingID holds _id that is greeting id
      * @param {*} callback holds a function 
     */
    retrieveGreetingDataById = (greetingID, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.getGreetingDataByGreetingId(greetingID, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult);
            }
        })
    }

    /**
     * @description remove greeting data from database using model's mothod
     * @param {*} greetingId holds _id that is greeting id
     * @param {*} callback holds a function 
    */
    removeGreetingDataById = (greetingId, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.deleteGreetingDataByGreetingId(greetingId, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult)
            }
        })
    }

    /**
      * @description update greeting data existed in database, using model's mothod
      * @param {*} greetingId holds _id that is greeting id
      * @param {*} dataToReplace takes data to be upadated in json formate
      * @param {*} callback holds a function 
     */
    updateGreetingDataById = (greetingId, dataToReplace, callback) => {
        logger.info(`TRACKED_PATH: Inside services`, 'info.log');

        greetingModel.updateGreetingDataGreetingId(greetingId, dataToReplace, (error, greetingResult) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, greetingResult)
            }
        })
    }
}

module.exports = new GreetingServices