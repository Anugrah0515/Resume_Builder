const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const authRoute = require('./Routes/authRoute');
const docRoute = require('./Routes/docRoute');
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/', authRoute);
app.use('/', docRoute);

module.exports = app;