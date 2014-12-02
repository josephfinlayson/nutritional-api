'use strict';
var express = require('express'),
    router = express.Router(),
    apiConnect = require('../lib/apiConnect'),
    grocerySearch = require('../lib/grocerySearch'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    Barcode = mongoose.model('Barcode'),
    Promise = require('bluebird');

function checkIfCached(barcodeString) {
    var deferred = Promise.defer()
        // var barcode = new Barcode()
    var found = Barcode.find(function(err, stuffs) {
        if (stuffs[0]) {
            deferred.resolve(stuffs);

        } else {
            deferred.reject({
                err: "not Cached"
            })
        }
    })

    return deferred.promise
}

function cacheInfo(info) {

    return info;
}

module.exports = function(app) {
    app.use(cors());
    app.use('/', router);
};

router.get('/barcode/:barcode?', function(req, res, next) {

    function returnInfo(data) {
        res.send(200, data)
    }

    function returnError(err) {
        res.send(500, err)
    }

    checkIfCached(req.params.barcode)
        //success, failure
        .then(returnInfo, apiConnect)
        .then(function(token) {
            return grocerySearch(token, req.params.barcode)
        })
        .then(cacheInfo)
        .then(returnInfo, returnError)

});


router.get('/*', function(req, res, next) {
    res.send(200, ['nothing here'])
});
