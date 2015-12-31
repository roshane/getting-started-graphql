"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _faker = require("faker");

var _faker2 = _interopRequireDefault(_faker);

var username = 'user';
var password = 'password';
var database = 'relay';

var conn = new _sequelize2["default"](database, username, password, {
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
		type: _sequelize2["default"].STRING,
		field: 'first_name',
		allowNull: false
	},
	lastName: {
		type: _sequelize2["default"].STRING,
		field: 'last_name',
		allowNull: false
	},
	age: {
		type: _sequelize2["default"].INTEGER,
		field: 'age',
		allowNull: false
	}
}, {
	freezeTableName: true
});

//COMMENTS TABLE DEFINITION
var Comment = conn.define('comment', {
	comment: {
		type: _sequelize2["default"].STRING,
		field: 'comment',
		allowNull: false
	}
}, {
	freezeTableName: true
});

//RELATIONSHIP DEFINITION
User.hasMany(Comment);
Comment.belongsTo(User);

// conn.sync({force: false}).then(()=> {
//   // Table created
//   ld.times(10,function(){
//   	return User.create({
//   		firstName: Faker.name.firstName(),
//   		lastName: Faker.name.lastName(),
//   		age: Faker.random.number()%100
//   	});

//   });
// });

// conn.sync({force:false}).then(()=>{
// 	ld.times(10,function(){
// 		return Comment.create({
// 			comment:Faker.lorem.paragraph(),
// 			userId:Faker.random.number()%10
// 		})
// 	});
// });

exports["default"] = conn;
module.exports = exports["default"];