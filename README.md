Nutritional API
===========================

This repository is intended to search some private Tesco APIs by barcode to return nutritional data. It doesn't work particularly well, but is somewhat useful for people trying to make apps based on nutritional data. 

It was create around 2 years ago for a hackathon, and open sourced for someone who wanted to check whether a certain product contained allergens

The endpoint exposed is: http://nut-api.herokuapp.com/barcode/:barcodeScanned. Any product that matches a barcode scanned is returned. However, it actually simply performs a full-text-search because tesco doesn't actually support a search by barcode feature. If it can't find a matching barcode, but can find matching products - this will appear in a `badProducts` array. e.g. http://nut-api.herokuapp.com/barcode/apple

All queries are cached in MongoDB, which means subsequent request to barcode that match, will be very fast. The tesco API can take up to 30 seconds to respond.

Have fun!



