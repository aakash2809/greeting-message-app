/**
* @module    routes
* @file      greeting.route.js
* @desc      This file is an entry point for application 
* @requires  controllers holdes by greetingMessage which is the reference 
*                        to invoke methods of controller/greeting.controller.js
* @author    Aakash Rajak <aakashrajak2809@gmail.com>
* @since     24/12/2020
*-----------------------------------------------------------------------------------------------------*/

const greetingMessage = require(`../controllers/greeting.controllers`);

class Routes {
  routeToController = (app) => {

    //Create a new greeting message
    app.post('/addGreeting', greetingMessage.addGreeting);

    // Retrieve all greeting messages
    app.get('/allGreetings', greetingMessage.findAllGreetings);

    // Retrieve a single greeting messages with greetingId
    app.get('/uniqueGreeting/:greetingId', greetingMessage.findGreetingByGreetingId);

    //Update a greeting messages with greetingId
    app.put('/updateGreeting/:greetingId', greetingMessage.updateGreetingByGreetingId);

    //Delete a greeting messages with greetingId
     app.delete('/greeting/:greetingId', greetingMessage.deleteGreetingByGreetingId);
  }
}
module.exports = new Routes