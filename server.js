const express = require(`express`);

/**
 * @description create express app
 */
const app = express();

/**
 * @description define a simple route
 */
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Greeting message application." });
});


/**
 * @description listen for requests
 */
app.listen(2000, () => {
    console.log(`server started listening on port 2000 `);
})