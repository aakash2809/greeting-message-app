require('./config/database.config')();
require(`dotenv`).config();
const express = require(`express`);
const route = require(`./app/routes/greeting.route`);
const logger = require('./config/logger');
const app = express();
const PORT = process.env.PORT || 2000
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const greetingRoute = require('./app/routes/greeting.route');

//parse requests 
app.use(express.urlencoded({ extended: true }));

//parse requests of content-type - application/json
app.use(express.json());

//Initialize the route
route.routeToController(app);

const option = {
  definition: {
    info: {
      title: 'Greeting Message App',
      version: '4.1.6',
      description: 'Demo'
    }
  },

  //path to api docs
  apis: ['./app/routes/greeting.route.js']
}

const swaggerSpec = swaggerJSDoc(option);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(swaggerSpec);

//listen for request
app.listen(PORT, () => {
  logger.info(`CONNECT_SERVER: Connected, server started listening on port : ${PORT}`);

});