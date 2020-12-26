
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
     * @description Retrieve a single Note with noteId
     */
    app.get('/greetingMessage/:messageId', greetingMessage.findOne);
}
