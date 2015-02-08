'use strict';
var express       = require('express'),
	router        = express.Router(),
	apiConnect    = require('../lib/apiConnect'),
	grocerySearch = require('../lib/grocerySearch'),
	cors          = require('cors'),
	mongoose      = require('mongoose'),
	Barcode       = mongoose.model('Barcode'),
	Promise       = require('bluebird'),
	now          = require('performance-now');

function checkIfCached(barcodeString) {
	var deferred = Promise.defer()
	// var barcode = new Barcode()
	Barcode.find({
		barcode: barcodeString
	}, function (err, stuffs) {
		if (stuffs[0]) {
			deferred.resolve(stuffs[0].info);
		}
		else {
			deferred.reject({
				err: "notCached"
			})
		}
	});

	return deferred.promise;
}

function cacheInfo(info, search) {
	var barcode = new Barcode({
		barcode: search,
		info: info
	});

	barcode.save()
	return info;
}


router.get('/barcode/:barcode?', function (req, res, next) {
	var bcApiStart = now()

	function returnInfo(data, perf) {
		 console.log(perf)
		var barcodeMonstersDuration =  now() - bcApiStart;
		var groceryCallDuration = perf.tescoCall ? perf.tescoCall[1] - perf.tescoCall[0] : 0;
		var handshakeCallDuration = perf.tescoHandshake ? perf.tescoHandshake[1] - perf.tescoHandshake[0]: 0;


		data.duration = {
			barcodeMonstersDuration:barcodeMonstersDuration,
			groceryCallDuration:groceryCallDuration,
			handshakeCallDuration:handshakeCallDuration
		};

		var barcodeMonstersDuration =  now() - bcApiStart - handshakeCallDuration - groceryCallDuration;

		res.send(200, data)
		return false
	}

	function returnError(err, perf) {
		console.log(perf)
		var groceryCallDuration = perf.tescoCall ? perf.tescoCall[1] - perf.tescoCall[0] : 0;
		var handshakeCallDuration = perf.tescoHandshake ? perf.tescoHandshake[1] - perf.tescoHandshake[0]: 0;

		var barcodeMonstersDuration =  now() - bcApiStart - handshakeCallDuration - groceryCallDuration;

		err.duration = {
			barcodeMonstersDuration:barcodeMonstersDuration,
			groceryCallDuration:groceryCallDuration,
			handshakeCallDuration:handshakeCallDuration
		};

		//console.log(err);
		res.send(500, err)
	}

	checkIfCached(req.params.barcode)
		.then(function (data) {
			console.log('a')
			returnInfo(data, {});

		}, function () {
			//if not cached


			var tescoHandshake = [];
			var tescoCall = [];


			tescoHandshake[0] = now()
			apiConnect(req.params.barcode)
				.then(function (token) {

					tescoHandshake[1] = tescoCall[0] = now();
					return grocerySearch(token, req.params.barcode)
				})
				.then(function (info) {

					tescoCall[1] = now();

					console.log("a", tescoCall)
					return cacheInfo(info, req.params.barcode)
				})
				.then(function (data) {
					console.log('a')
					returnInfo(data, {tescoHandshake: tescoHandshake, tescoCall: tescoCall});

				}, function (data) {
						if(!tescoCall[1]) {
							tescoCall[1] = now();
						}
					returnError(data, {tescoHandshake: tescoHandshake, tescoCall: tescoCall});
				})
		})
});

router.get('/admin', function (req, res, next) {
	Barcode.find(function (err, data) {
		res.send(data);
	});
});

router.get('/*', function (req, res, next) {
	res.send(200, ['nothing here'])
});

module.exports = function (app) {
	app.use(cors());
	app.use('/', router);
};
