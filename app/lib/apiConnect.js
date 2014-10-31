'use strict';


var request = require('request');
var Promise = require("bluebird");

// lib function
function prequest(url, options) {
    options = options || {};
    if (typeof url === 'string') {
        options.url = url;
    } else {
        options = url;
    }
    options.json = options.hasOwnProperty('json') ? options.json : true;

    return new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode >= 400) {
                reject(response);
            } else if (options.arrayResponse) {
                resolve([response, body]);
            } else {
                resolve(body);
            }
        });
    });
}

//Tokens
var apiDetailsRefresh = {
    grant_type: 'password',
    username: 'joseph.finlayson+bmtest@gmail.com',
    password: 'barCodeMon99',
    Client_Secret: 'da6CF8PP8xni65eudmEX',
    Client_ID: 'AB37EB44DF1AC07531E5',
    version: '2.0'
};


var getApiDetailsSession = function(token, details) {
    token.grant_type = "refresh_token"
    token.refresh_token = details.refresh_token;
    return token;
};

// Methods
var getRefreshToken = function() {
    var refreshTokenRequest = prequest({
        url: 'https://mobile.tesco.com/groceryapi/restservice.aspx?COMMAND=TOKEN',
        form: apiDetailsRefresh,
        method: 'post'
    }).then(getSessionToken)

    return refreshTokenRequest;
};

var getSessionToken = function(data) {
    var apiDetailsSession = getApiDetailsSession(apiDetailsRefresh,data)

    var sessionTokenRequest = prequest({
        url: 'https://mobile.tesco.com/groceryapi/restservice.aspx?COMMAND=TOKEN',
        form: apiDetailsSession,
        method: 'post'
    })
    return sessionTokenRequest
};

var getToken = function() {
    var token = getRefreshToken(apiDetailsRefresh)
        .then(getSessionToken)

    return token
};

module.exports = getToken
