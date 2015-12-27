"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _faker = require("faker");

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const username = 'user';
const password = 'password';
const database = 'relay';

var conn = new _sequelize2.default(database, username, password, {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

//USER TABLE DEFINITION
var User = conn.define('user', {
	firstName: {
		type: _sequelize2.default.STRING,
		field: 'first_name',
		allowNull: false
	},
	lastName: {
		type: _sequelize2.default.STRING,
		field: 'last_name',
		allowNull: false
	},
	age: {
		type: _sequelize2.default.INTEGER,
		field: 'age',
		allowNull: false
	}
}, {
	freezeTableName: true
});

//COMMENTS TABLE DEFINITION
var Comment = conn.define('comment', {
	comment: {
		type: _sequelize2.default.STRING,
		field: 'comment',
		allowNull: false
	}
}, {
	freezeTableName: true
});

//RELATIONSHIP DEFINITION
User.hasMany(Comment);
Comment.belongsTo(User);

conn.sync({ force: true }).then(() => {
	// Table created
	_lodash2.default.times(10, function () {
		return User.create({
			firstName: _faker2.default.name.firstName(),
			lastName: _faker2.default.name.lastName(),
			age: _faker2.default.random.number() % 100
		});
	});
});

conn.sync({ force: true }).then(() => {
	_lodash2.default.times(10, function () {
		return Comment.create({
			comment: _faker2.default.lorem.paragraph(),
			userId: _faker2.default.random.number() % 10
		});
	});
});

exports.default = conn;