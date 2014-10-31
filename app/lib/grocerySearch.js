'use strict';
var prequest = require("./prequest");

var url = 'http://mobile.tesco.com/groceryapi/RESTService.aspx'

var query = {
    COMMAND: 'PRODUCTSEARCH',
    sessionkey: '', //to be populated
    SEARCHTEXT: '', //to be populated
    EXTENDEDINFO: 'Y',
    version: '2.0'
}

var getGroceryByBarcode = function(token, barcode) {
    query.sessionkey = token.access_token;
    query.SEARCHTEXT = barcode;
    var groceryRequest = prequest(url, {
        qs: query, //querystring!
        method:'get'
    })

    return groceryRequest
}


module.exports = getGroceryByBarcode
