'use strict';
var request = require('request');

var apiDetails = {
    grant_type: 'password',
    username: 'joseph.finlayson+bmtest@gmail.com',
    password: 'barCodeMon99',
    Client_Secret: 'da6CF8PP8xni65eudmEX',
    Client_ID: 'AB37EB44DF1AC07531E5',
    version: '2.0'
}

var tesco = request.post({
    url: 'https://mobile.tesco.com/groceryapi/restservice.aspx?COMMAND=TOKEN',
    form: apiDetails
})

// tesco.setEncoding('utf-8')

tesco.on('response', function(response, a, b) {
    var body = '';
    response.setEncoding('utf8');
    response.on('data', function(data) {
        // body += data;
    });
});
