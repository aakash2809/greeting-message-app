
/**
* @desc   This server.js is an entry point for application.
* @requires {@link https://www.npmjs.com/package/swagger-ui-express|swaggerUi}
* @requires {@link https://expressjs.com/|app}
*
*-----------------------------------------------------------------------------------------------------*/

require('./config/database.config')();
require(`dotenv`).config();

const express         = require(`express`);
const route           = require(`./app/routes/greeting.route`);
const logger          = require('./config/logger');
const app             = express();
const PORT            = process.env.PORT || 2000;
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./app/lib/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//parse requests 
app.use(express.urlencoded({ extended: true }));

//parse requests of content-type - application/json
app.use(express.json());

//Initialize the route
route.routeToController(app);

//listen for request
app.listen(PORT, () => {
  logger.info(`CONNECT_SERVER: Connected, server started listening on port : ${PORT}`);

});