
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var morgan  = require('morgan');
var bodyParser  = require('body-parser');
mongoose.connect('mongodb://ParthPanchal:parthpanchal8778@ds023520.mlab.com:23520/team_travey');

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

require('./routes/routes.js')(app);

app.listen(port);

console.log('The App runs on port ' + port);
