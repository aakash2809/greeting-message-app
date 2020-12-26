
module.exports = (app) => {
    const greetingMessage = require(`../controllers/greeting.controllers.js`)

    /**
     * @description Create a new greeting message
     */
    app.post('/greetingMessage', greetingMessage.create);
}
