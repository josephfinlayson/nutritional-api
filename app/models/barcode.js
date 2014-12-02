// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var barcodeSchema = new Schema({
});

mongoose.model('Barcode', barcodeSchema);
