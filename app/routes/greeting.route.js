const greetingMessage = require(`../controllers/greeting.controllers`);

class Routes {
  routeToController = (app) => {

    //Create a new greeting message
    /**
 * @swagger
 * 
 *  /greetingMessage:
 *    post:
 *      summary: insert greeting
 *      description: data validate with the schema and inser to database
 *      parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: message
 *         in: body
 *         required: true
 *         type: string
 *      responses:
 *          '200':
 *              description: A successful response 
 */

    app.post('/greetingMessage', greetingMessage.create);

    // Retrieve all greeting messages
    /**
    * @swagger
    * 
    *  /greetingMessage:
    *    get:
    *      summary: retrive All greeting
    *      description: retrive data and give response
    *      responses:
    *          '200':
    *              description: A successful response 
    */
    app.get('/greetingMessage', greetingMessage.findAll);

    // Retrieve a single greeting messages with greetingId
    /**
     * @swagger
     * 
     *  /greetingMessage{greetingId}:
     *    get:
     *      summary: retrive greeting 
     *      description: retrive data by id and give response
     *      requestBody:
     *         parameters:
     *           - in: "body"
     *            name: "body"
     *            description: "greeting"
     *            required: true
     *            schema:
     *              properties:
     *                name:
     *                  type: string
     *                  description: name
     *                message:
     *                  type: string
     *      responses:
     *          '200':
     *              description: A successful response 
     */
    app.get('/greetingMessage/:greetingId', greetingMessage.findOne);

    //Update a greeting messages with greetingId
    /**
 * @swagger
 * 
 *  /greetingMessage{greetingId}:
 *    put:
 *      summary: update greeting by id
 *      description: update greeting
 *      requestBody:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: name
 *                message:
 *                  type: string
 *      responses:
 *          '200':
 *              description: A successful response 
 */
    app.put('/greetingMessage/:greetingId', greetingMessage.update);

    //Delete a greeting messages with greetingId
    /**
 * @swagger
 * 
 *  /greetingMessage{greetingId}:
 *    delete:
 *      summary: delete greeting 
 *      description: delete by id and give response
 *      requestBody:
 *            content:
 *               application/json:
 *            schema:
 *              MessageSchema:
 *                type: object
 *              properties:
 *                name:
 *                  type: string
 *                  required: true
 *                message:
 *                  type: string
 *                  required: true
 *      responses:
 *          '200':
 *              description: A successful response 
 */
    app.delete('/greetingMessage/:greetingId', greetingMessage.delete);
  }
}
module.exports = new Routes