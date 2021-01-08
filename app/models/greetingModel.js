/**
 * @module       models
 * @file         greetingModel.js
 * @description  This module is used for creating the schema and comunicate with mongodb
 *               through mongoose
 * @requires     {@link http://mongoosejs.com/|mongoose} 
 * @requires     logger is a reference to save logs in log files
 * @author       Aakash Rajak <aakashrajak2809@gmail.com>
 * @since        24/12/2020
------------------------------------------------------------------------------------------*/

const mongoose       = require(`mongoose`);
const logger         = require("../../config/logger");
const greetingSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function (name) {
                return /^[A-Z]{1}[a-zA-Z]{2,}$/.test(name);
            },
            message: () => `should have minimum length 3!`
        },
        required: true
    },
    message: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    },
);

greetingSchema.set('versionKey', false);

logger.info('inside model');

const greetingModelInstance = mongoose.model(`greetingMessage`, greetingSchema);

class GreetingModel {
    /**
      * @description save request greeting data to database 
      * @param {*} greetingData holds data to be saved in json formate
      * @param {*} callback holds a function 
     */
    saveGreeting = (greetingData, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        const greetingMessage = new greetingModelInstance(greetingData);
        greetingMessage.save((error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    /**
    * @description retrive all greeting data from database 
    * @param {*} callback holds a function 
   */
    getAllGreetings = (callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.find((error, greetingData) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingData);
            }
        });
    }

    /**
     * @description retrive one greeting data from database 
     * @param {*} greetingID holds _id that is greeting id
     * @param {*} callback holds a function 
    */
    getGreetingDataByGreetingId = (greetingId, callback) => {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findById(greetingId, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    /**
     * @description remove greeting data from database 
     * @param {*} greetingId holds _id that is greeting id
     * @param {*} callback holds a function 
    */
    deleteGreetingDataByGreetingId(greetingData, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findByIdAndDelete(greetingData, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);
            }
        });
    }

    /**
    * @description update greeting data existed in database
    * @param {*} greetingId holds _id that is greeting id
    * @param {*} dataToUpdate takes data to be upadated in json formate
    * @param {*} callback holds a function 
   */
    updateGreetingDataGreetingId(MessageId, dataToUpdate, callback) {
        logger.info(`TRACKED_PATH: Inside model`, 'info.log');

        greetingModelInstance.findByIdAndUpdate(MessageId, dataToUpdate, { new: true }, (error, greetingResult) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, greetingResult);;
            }
        });
    }
}

module.exports = new GreetingModel;
