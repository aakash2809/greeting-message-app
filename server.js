require('./config/database.config.js')();
require(`dotenv`).config();

const express = require(`express`);
const route = require(`./app/routes/greeting.route.js`);
const app = express();
const PORT = process.env.PORT || 2000;


/**
 * @description parse requests 
 */
app.use(express.urlencoded({ extended: true }));
/**
 * @description parse requests of content-type - application/json
 */

app.use(express.json());
route(app);

/**
 * @description listen for requests
 */
app.listen(PORT, () => {
    console.log(`server started listening on port 2000 `);
});