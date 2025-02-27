const moduleAlias = require('module-alias');
const path = require('path');

moduleAlias.addAliases({
    '@Validation': path.join(__dirname, 'dist/validation'),
    '@Utils': path.join(__dirname, 'dist/utils'),
    '@Middleware': path.join(__dirname, 'dist/middleware'),
    '@Controllers': path.join(__dirname, 'dist/controllers'),
    '@Models': path.join(__dirname, 'dist/models'),
    '@Config': path.join(__dirname, 'dist/config'),
    '@Routes': path.join(__dirname, 'dist/routes'),
});

require('./dist/server.js');
