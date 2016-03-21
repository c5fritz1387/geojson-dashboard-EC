Package.describe({
  name: 'agershun:alasql',
  version: '0.2.4',
  // Brief, one-line summary of the package.
  summary: 'AlaSQL - JavaScript SQL database library',
  // URL to the Git repository containing the source code for this package.
  git: 'http://github.com/agershun/alasql.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: '../../README.md'
});

Package.onUse(function(api) {
//  api.versionsFrom('METEOR-CORE@0.9.0');
//  api.use('alasql', ['client', 'server']);
//  api.export('alasql','client');
  api.addFiles('../../dist/alasql.min.js');
  api.addAssets('../../dist/alasql-echo.js',["client","server"]);
});

Package.onTest(function(api) {
//  api.use('tinytest');
//  api.use('agershun:alasql');
//  api.addFiles('alasql-tests.js');
});
