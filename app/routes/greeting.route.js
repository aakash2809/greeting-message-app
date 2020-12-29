
module.exports = (app) => {
    const greetingMessage = require(`../controllers/greeting.controllers.js`)

    //Create a new greeting message
     app.post('/greetingMessage', greetingMessage.create);

    // Retrieve all greeting messages
    app.get('/greetingMessage', greetingMessage.findAll);

    // Retrieve a single greeting messages with messageId
   app.get('/greetingMessage/:messageId', greetingMessage.findOne);

   //Update a greeting messages with messageId
   app.put('/greetingMessage/:messageId', greetingMessage.update);

     //Delete a greeting messages with messageId
    app.delete('/greetingMessage/:messageId', greetingMessage.delete);
}
