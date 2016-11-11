var express = require('express');
var app = express();
var logger = require('morgan')('dev');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Routes = require('./routes.js');
var PORT = process.env.PORT || 3000;
var sessions = require('client-sessions')({
        cookieName: "dare-session",  // front-end cookie name, currently pulled from package.json, feel free to change
        secret: 'BOOM',        // the encryption password : keep this safe
        requestKey: 'session',    // req.session,
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: false,     // when true, cookie expires when browser is closed
            httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
            secure: false         // when true, cookie will only be read when sent over HTTPS
        }
    });

mongoose.Promise = global.Promise ;


app.use(
    logger,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    sessions
);
app.use(express.static('public'));
Routes(app);

app.listen(PORT, () => {
    console.info('Server up on port: ', PORT);
});

mongoose.connect('mongodb://localhost/dare', (err) => {
    console.log( err ? 'Could not connect!' : 'Connected!')
});
