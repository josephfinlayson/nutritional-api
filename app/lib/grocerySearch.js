'use strict';
var prequest = require("./prequest");
var _ = require('lodash')
var globalBarcode;
var url = 'http://mobile.tesco.com/groceryapi/RESTService.aspx'
var requiredFields = [
    "RDA_Calories_Count",
    "RDA_Calories_Percent",
    "RDA_Sugar_Grammes",
    "RDA_Sugar_Percent",
    "RDA_Fat_Grammes",
    "RDA_Fat_Percent",
    "RDA_Saturates_Grammes",
    "RDA_Saturates_Percent",
    "RDA_Salt_Grammes",
    "RDA_Salt_Percent",
    "Nutrients",
    "UnitType",
    "Name",
    "ImagePath",
    "Ingredients",
    "ProductId",
    "BaseProductId",
    "EANBarcode"
];
var query = {
    COMMAND: 'PRODUCTSEARCH',
    sessionkey: '', //to be populated
    SEARCHTEXT: '', //to be populated
    EXTENDEDINFO: 'Y',
    version: '2.0'
}

var checkIfResultCorrect = function(data) {
    if (!data.Products || data.Products.length === 0) {
        throw {
            err: 'productNotFound',
            barcode: globalBarcode,
            badProducts: 0
        }
    }
    for (var i = data.Products.length - 1; i >= 0; i--) {
        if (data.Products[i].EANBarcode.indexOf(globalBarcode) >= 0) {
            return data.Products[i]
        }
    };

    throw {
        err: 'barcodeNotFound',
        barcode: globalBarcode,
        badProducts: data.Products,
    }
};

var extractCorrectData = function(product) {
    return _.pick(product, requiredFields)
};

var calculateNutrientProfile = function(product) {
    return product
};

var getGroceryByBarcode = function(token, barcode) {
    query.sessionkey = token
    query.SEARCHTEXT = barcode;
    globalBarcode = barcode
    var groceryRequest = prequest(url, {
            qs: query, //querystring!
            method: 'get'
        })
        .then(checkIfResultCorrect)
        .then(extractCorrectData)
        .then(calculateNutrientProfile)

    return groceryRequest
}


module.exports = getGroceryByBarcode
