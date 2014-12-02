var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'barcode-monsters-webservice'
    },
    port: 3000,
    db: 'mongodb://localhost/barcode-monsters-webservice-development'
  },
  production: {
    root: rootPath,
    app: {
      name: 'barcode-monsters-webservice'
    },
    port: process.env.PORT || 80,
    db: 'mongodb://barcodeM:monsterpassword@ds053190.mongolab.com:53190/heroku_app31149656'

  }
};

module.exports = config[env];
