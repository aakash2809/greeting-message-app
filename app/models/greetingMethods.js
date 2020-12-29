//const Mongoose  = require("mongoose")
const greetingMessage = require('./greeting.js');
const Greeting = greetingMessage.model(`greetingMessage`);

class ApiMethods {
    createMessage = (req, callback) => {
        const greeting = new Greeting({ message: req.body.message });
        greeting.save({}, (error, data) => {
            if (error)
                callBack(error, null);
            else
                return callBack(null, data);
        });

        /* try{
            const greetingMessage = new Greeting({message: req.body.message });
            await greetingMessage.save();
            return greetingMessage;
            }catch(err){
               return 'data not saved'
            }  */
    }
}

module.exports = new ApiMethods;

/* exports.createMessage = function (req, res) {
    var greetingMessage =new Greeting({message: req.body.message});
      greetingMessage.create(greetingMessage, function(err, greetingMessage) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json(greetingMessage)
    })
} */