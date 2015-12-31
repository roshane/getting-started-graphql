'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _graphql = require('graphql');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var User = new _graphql.GraphQLObjectType({
	name: 'User',
	description: 'User entity',
	fields: function fields() {
		return {
			id: {
				type: _graphql.GraphQLInt,
				resolve: function resolve(user) {
					return user.id;
				}
			},
			firstName: {
				type: _graphql.GraphQLString,
				resolve: function resolve(user) {
					return user.firstName;
				}
			},
			lastName: {
				type: _graphql.GraphQLString,
				resolve: function resolve(user) {
					return user.lastName;
				}
			},
			age: {
				type: _graphql.GraphQLInt,
				resolve: function resolve(user) {
					return user.age;
				}
			},
			comments: {
				type: new _graphql.GraphQLList(Comment),
				resolve: function resolve(user) {
					return user.getComments();
				}
			}
		};
	}

});

var Comment = new _graphql.GraphQLObjectType({
	name: 'Comment',
	description: 'Comment entity',
	fields: function fields() {
		return {
			id: {
				type: _graphql.GraphQLInt,
				resolve: function resolve(comment) {
					return comment.id;
				}
			},
			comment: {
				type: _graphql.GraphQLString,
				resolve: function resolve(comment) {
					return comment.comment;
				}
			},
			user: {
				type: User,
				resolve: function resolve(comment) {
					return comment.getUser();
				}
			}
		};
	}

});

var Query = new _graphql.GraphQLObjectType({
	name: "Query",
	description: "Query to retrieve data",
	fields: function fields() {
		return {
			users: {
				type: new _graphql.GraphQLList(User),
				args: {
					id: {
						type: _graphql.GraphQLInt
					},
					firstName: {
						type: _graphql.GraphQLString
					},
					lastName: {
						type: _graphql.GraphQLString
					}
				},
				resolve: function resolve(root, args) {
					return _db2['default'].models.user.findAll({ where: args });
				}
			},
			comments: {
				type: new _graphql.GraphQLList(Comment),
				resolve: function resolve(root, args) {
					return _db2['default'].models.comment.findAll({ where: args });
				}
			}
		};
	}
});

var Schema = new _graphql.GraphQLSchema({
	query: Query
});

exports['default'] = Schema;
module.exports = exports['default'];