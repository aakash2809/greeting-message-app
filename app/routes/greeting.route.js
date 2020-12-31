const greetingMessage = require(`../controllers/greeting.controllers`);

class Routes {
  routeToController = (app) => {
    
    //Create a new greeting message
    app.post('/greetingMessage', greetingMessage.create);

    // Retrieve all greeting messages
    app.get('/greetingMessage', greetingMessage.findAll);

    // Retrieve a single greeting messages with greetingId
    app.get('/greetingMessage/:greetingId', greetingMessage.findOne);

    //Update a greeting messages with greetingId
    app.put('/greetingMessage/:greetingId', greetingMessage.update);

    //Delete a greeting messages with greetingId
    app.delete('/greetingMessage/:greetingId', greetingMessage.delete);
  }
}
module.exports = new Routes