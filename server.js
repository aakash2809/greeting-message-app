require('./config/database.config')();
require(`dotenv`).config();

const express = require(`express`);
const route = require(`./app/routes/greeting.route`);
const logger = require('./config/logger');
const app = express();
const PORT = process.env.PORT || 2000
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//parse requests 
app.use(express.urlencoded({ extended: true }));

//parse requests of content-type - application/json
app.use(express.json());

//Initialize the route
route.routeToController(app);

 const option = {
  definition: {
    info: {
      title: 'Swagger API demo',
      version: '4.1.6',
      description: 'demo'
    }
  },
  apis: ['./api/demo']
}

const swaggerSpec = swaggerJSDoc(option);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

//Routes

/**
 * @swagger
 * /api/demo:
 *  get:
 *      description: Get demo hello world:
 *      responses:
 *          '200':
 *              description: A successful response 
 */

app.get('/api/demo', (req, res) => {
  res.send('hello');
});
console.log(swaggerSpec);

//listen for request
app.listen(PORT, () => {
  logger.info(`CONNECT_SERVER: Connected, server started listening on port : ${PORT}`);

});