
module.exports = (app) => {
    const greetingMessage = require(`../controllers/greeting.controllers.js`)

    /**
     * @description Create a new greeting message
     */
    app.post('/greetingMessage', greetingMessage.create);

    /**
    * @description Retrieve all greeting messages
    */
    app.get('/greetingMessage', greetingMessage.findAll);

    /**
     * @description Retrieve a single greeting messages with messageId
     */
    app.get('/greetingMessage/:messageId', greetingMessage.findOne);

    /**
     * @description Update a greeting messages with messageId
     */
    app.put('/greetingMessage/:messageId', greetingMessage.update);

    /**
    * @description Delete a greeting messages with messageId
    */
    app.delete('/greetingMessage/:messageId', greetingMessage.delete);
}
