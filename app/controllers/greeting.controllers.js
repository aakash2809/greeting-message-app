const { restart } = require('nodemon');
const Greeting = require('../models/greeting.js');
const servises = require(`../services/greeting.services.js`)
const A = require('../models/greetingMethods.js');
/**
 * @description Create and Save message
 */
exports.create = (req, res) => {
/*   const requestResult = servises.saveAndReturnResponse(req);
  console.log(requestResult);
    res.send(requestResult); */
   /*  try{
    const greetingMessage = new Greeting({message: req.body.message });
    await greetingMessage.save();
    res.send(greetingMessage);
    }catch(err){
        res.send('data not saved')
    } */
    const b = A.createMessage(req,res);
    console.log(b.res);
    res.send(b.res);

};

/**
 * @description Retrieve and return all greeting message from the database.
 */
exports.findAll = (req, res) => {
    Greeting.find()
        .then(greetingMessage => {
            res.send(greetingMessage);
        }).catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving greeting message.`
            });
        });
};

/**
 * @description Find a single message with a messageId.
 */
exports.findOne = (req, res) => {
    Greeting.findById(req.params.messageId)
        .then(greetingMessage => {
            if (!greetingMessage) {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            res.send(greetingMessage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            return res.status(500).send({
                message: `Error retrieving greeting message with id ${req.params.messageId}`
            });
        });
};

/**
 * @description Update greeting message identified by the messageId in the request
 */
exports.update = (req, res) => {
    // Validate request     
    if (!req.body.message) {
        return res.status(400).send({
            message: `greeting message can not be empty`
        });
    }

    /**
     * @description Find greeting message and update it with the request body
     */
    Greeting.findByIdAndUpdate(req.params.messageId, {
        message: req.body.message
    }, { new: true })
        .then(greetingMessage => {
            if (!greetingMessage) {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            res.send(greetingMessage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            return res.status(500).send({
                message: `Error retrieving greeting message with id ${req.params.messageId}`
            });
        });
};

/**
 * @description Delete a greeting message with the specified messageId in the request
 */
exports.delete = (req, res) => {
    Greeting.findByIdAndRemove(req.params.messageId)
        .then(greetingMessage => {
            if (!greetingMessage) {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            res.send({ message: "message deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `greeting message not found with id ${req.params.messageId}`
                });
            }
            return res.status(500).send({
                message: `Error retrieving greeting message with id ${req.params.messageId}`
            });
        });
};