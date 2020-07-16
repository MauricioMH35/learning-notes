const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const indexRoute = require('./routes/index-route');
const printRoute = require('./routes/print-route');

app.use(bodyParser.json({ limit: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRoute);
app.use('/print', printRoute);

module.exports = app;