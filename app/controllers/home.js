'use strict';
var express = require('express'),
    router = express.Router(),
    apiConnect = require('../lib/apiConnect'),
    grocerySearch = require('../lib/grocerySearch'),
    cors = require('cors')
module.exports = function(app) {
    app.use('/', router);
};

app.use(cors());
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
            }, function(err){
                res.send(500, err)
            }
        )
});
