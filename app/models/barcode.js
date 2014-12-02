// Example model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var barcodeSchema = new Schema({
    barcode: String,
    info: Object
});

mongoose.model('Barcode', barcodeSchema);
