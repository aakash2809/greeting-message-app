const Greeting = require('../models/greetingMethods.js');

const saveAndReturnResponse = (req) => {
    //var result;
    //Validate request
    if (!req.body.message) {
        result = `greeting message can not be empty`;
    }

    //Create a greeting message
    const greetingMessage = new Greeting({ message: req.body.message });

    /* try {
        const greetingMessage = new Greeting({
            message: req.body.message
        });
        const data = greetingMessage.save();
        //console.log(data));
        return (data);
    } catch (err) {
        return `Some error occurred while creating the message.`
    } */

    //Save greeting message in the database
    result = greetingMessage.save()
        .then((data) => {
            return data;

        })
        .catch(err => {
            return { message: err.message || `Some error occurred while creating the message.` };
        });

    //console.log(result);
   // return result;
}

module.exports = { saveAndReturnResponse }



