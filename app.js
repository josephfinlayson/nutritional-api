'use.strict';
var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose'),
    coffee = require('coffee-script'),
    request = require('request')

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function() {
    throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
    require(model);
});

var app = express();

require('./config/express')(app, config);
console.log(config.port);
app.listen(config.port);