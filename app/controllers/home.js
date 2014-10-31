'use strict';
var express = require('express'),
    router = express.Router(),
    model = require('../models'),
    apiConnect = require('../lib/apiConnect'),
    grocerySearch = require('../lib/grocerySearch')



module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res, next) {
    console.log(req.params)

    res.send(200, ['nothing here'])
        // data.then(function(a) {
        //     console.log(a);
        // })
});

router.get('/barcode/:barcode?', function(req, res, next) {

    apiConnect()
        .then(function(token) {
            return grocerySearch(token, req.params.barcode)
        }).then(
            function(stuff) {
                console.log(stuff)
                res.send(200, stuff)
            }
        )
        // data.then(function(a) {
        //     console.log(a);
        // })
});
