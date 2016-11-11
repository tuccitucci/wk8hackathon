var express = require('express');
var app = express();
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Routes = require('./routes.js');
var PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise ;

app.use(express.static('public'));

app.use(
    log
    , bodyParser.json()
    , bodyParser.urlencoded({ extended: true })
);

Routes(app);

app.listen(PORT, () => {
    console.info('Server up on port: ', PORT);
});

mongoose.connect('mongodb://localhost/dare', (err) => {
    console.log( err ? 'Could not connect!' : 'Connected!')
});
