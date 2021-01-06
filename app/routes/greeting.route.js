const greetingMessage = require(`../controllers/greeting.controllers`);

class Routes {
  routeToController = (app) => {

    //Create a new greeting message
    app.post('/addGreeting', greetingMessage.create);

    // Retrieve all greeting messages
    app.get('/allGreetings', greetingMessage.findAll);

    // Retrieve a single greeting messages with greetingId
    app.get('/uniqueGreeting/:greetingId', greetingMessage.findOne);

    //Update a greeting messages with greetingId
    app.put('/updateGreeting/:greetingId', greetingMessage.update);

    //Delete a greeting messages with greetingId
     app.delete('/greeting/:greetingId', greetingMessage.delete);
  }
}
module.exports = new Routes