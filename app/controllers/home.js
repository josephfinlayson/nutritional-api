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
    Barcode.find({
        barcode: barcodeString
    }, function(err, stuffs) {
        if (stuffs[0]) {
            deferred.resolve(stuffs[0].info);
        } else {
            deferred.reject({
                err: "notCached"
            })
        }
    })

    return deferred.promise;
}

function cacheInfo(info, search) {
    var barcode = new Barcode({
        barcode: search,
        info: info
    });

    barcode.save()
    return info;
}


router.get('/barcode/:barcode?', function(req, res, next) {

    function returnInfo(data) {
        res.send(200, data)
    }

    function returnError(err) {
        console.log(err);
        res.send(500, err)
    }

    checkIfCached(req.params.barcode)
        //success, failure
        .then(returnInfo, apiConnect)
        .then(function(token) {
            return grocerySearch(token, req.params.barcode)
        })
        .then(function(info) {
            return cacheInfo(info, req.params.barcode)
        })
        .then(returnInfo, returnError)
});

router.get('/admin', function(req, res, next) {
    Barcode.find(function(err, data) {
        res.send(data);
    });
});

router.get('/*', function(req, res, next) {
    res.send(200, ['nothing here'])
});

module.exports = function(app) {
    app.use(cors());
    app.use('/', router);
};
