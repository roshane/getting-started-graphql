'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var app = (0, _express2['default'])();

var PORT = 3000;

app.use('/', (0, _expressGraphql2['default'])({
	schema: _schema2['default'],
	pretty: true,
	graphiql: true
}));

app.listen(PORT, function () {
	console.log('application started on http://localhost:' + PORT);
});