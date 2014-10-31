'use strict';
var express = require('express'),
    router = express.Router(),
    apiConnect = require('../lib/apiConnect'),
    grocerySearch = require('../lib/grocerySearch')

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res, next) {
    res.send(200, ['nothing here'])
});

router.get('/barcode/:barcode?', function(req, res, next) {

    apiConnect()
        .then(function(token) {
            return grocerySearch(token, req.params.barcode)
        }).then(
            function(data) {
                res.send(200, data)
            }
        )
});
