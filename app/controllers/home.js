'use strict';
var express = require('express'),
    router = express.Router(),
    model = require('../models'),
    readData = model.readData,
    writeData = model.writeData;

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res, next) {
    console.log(readData)
    var data = readData()
    data.then(function(donedata){
      res.send(200,donedata)
    })
    // data.then(function(a) {
    //     console.log(a);
    // })
});
