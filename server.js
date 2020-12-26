const express = require(`express`);
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const route = require(`./app/routes/greeting.route.js`);

/**
 * @description create express app
 */
const app = express();

/**
 * @description parse requests 
 */
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * @description parse requests of content-type - application/json
 */
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

/**
 * @description Connecting to the database
 */
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/**
 * @description define a simple route
 */
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Greeting message application." });
});

route(app);


/**
 * @description listen for requests
 */
app.listen(2000, () => {
    console.log(`server started listening on port 2000 `);
})