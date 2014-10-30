'use strict';
var express = require('express'),
    router = express.Router(),
    model = require('../models'),
    apiConnect = require('../lib/apiConnect')


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

router.get('/barcode/:id?', function(req, res, next) {

    console.log(apiConnect);
    res.send(200, req.params)
        // data.then(function(a) {
        //     console.log(a);
        // })
});
