'use strict';
var prequest = require('./prequest');
var Promise = require('bluebird');

var sessionToken, refreshToken, url = 'https://mobile.tesco.com/groceryapi/restservice.aspx?COMMAND=TOKEN';
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
    details.grant_type = "refresh_token"
    details.refresh_token = token;
    return details;
};

// Methods
var getRefreshToken = function() {
    var refreshTokenRequest = prequest({
        url: url,
        form: apiDetailsRefresh,
        method: 'post'
    })

    return refreshTokenRequest;
};

var getSessionToken = function(token) {
    var apiDetailsSession = getApiDetailsSession(token, apiDetailsRefresh)
    var sessionTokenRequest = prequest({
        url: url,
        form: apiDetailsSession,
        method: 'post'
    }).then(extractToken)
    return sessionTokenRequest
};

var extractToken = function(obj) {
    return obj.access_token
}

// updates the session token at every expiry Date
var keepTokenFresh = function(tokenDetails) {
    sessionToken = tokenDetails.access_token;
    refreshToken = tokenDetails.refresh_token;

    var expiryMillisecs = tokenDetails.expires_in * 900
    //timeout to wait until first expiry
    setTimeout(function() {
    //interval for every subsequent expiry
        setInterval(function() {
            getSessionToken(refreshToken)
                .then(function(token) {
                    sessionToken = token
                })
        }, expiryMillisecs)
    }, expiryMillisecs)

    return tokenDetails;
}


//chec
var getToken = function() {
    if (typeof sessionToken != 'undefined') {
        console.log("returning saved token")
        return Promise.resolve(sessionToken);
    } else {
        var token = getRefreshToken(apiDetailsRefresh)
            .then(keepTokenFresh)
            .then(extractToken)

        return token
    }

};

module.exports = getToken
