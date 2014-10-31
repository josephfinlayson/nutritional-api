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
    // db: 'mongodb://localhost/barcode-monsters-webservice-development'

  },

  test: {
    root: rootPath,
    app: {
      name: 'barcode-monsters-webservice'
    },
    port: 3000,
    // db: 'mongodb://localhost/barcode-monsters-webservice-test'

  },

  production: {
    root: rootPath,
    app: {
      name: 'barcode-monsters-webservice'
    },
    port: process.env.PORT || 80,
    // db: 'mongodb://localhost/barcode-monsters-webservice-production'

  }
};

module.exports = config[env];
