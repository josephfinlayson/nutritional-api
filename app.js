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


// var username, password;

var apiDetails = {
	grant_type: 'password',
	username: 'joseph.finlayson+bmtest@gmail.com',
	password: 'barCodeMon99',
	Client_Secret: 'da6CF8PP8xni65eudmEX',
	Client_ID:'AB37EB44DF1AC07531E5',
	version: '2.0'
}

var tesco = request.post({url :'https://mobile.tesco.com/groceryapi/restservice.aspx?COMMAND=TOKEN', form:apiDetails}, function(a,b,body){console.log(body)})

tesco.on('response', function(response,a,b){console.log(response.data)})

var app = express();

require('./config/express')(app, config);
console.log(config.port)
app.listen(config.port);
