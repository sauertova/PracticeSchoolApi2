const express = require('express');
const app = express();
const morgan = require('morgan');
module.exports = app;

//Logging middleware
app.use(morgan('dev'));

//Base route here
app.use('/api', require('./api'));


app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status || 500).send(err.message)
});
