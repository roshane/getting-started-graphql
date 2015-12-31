import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema
} from 'graphql';

import db from './db';

const User=new GraphQLObjectType({
	name:'User',
	description:'User entity',
	fields:()=>{
		return {
			id:{
				type:GraphQLInt,
				resolve(user){
					return user.id;
				}
			},
			firstName:{
				type:GraphQLString,
				resolve(user){
					return user.firstName;
				}
			},
			lastName:{
				type:GraphQLString,
				resolve(user){
					return user.lastName;
				}
			},
			age:{
				type:GraphQLInt,
				resolve(user){
					return user.age;
				}
			},
			comments:{
				type:new GraphQLList(Comment),
				resolve(user){
					return user.getComments();
				}
			}
		}
	},

});

const Comment=new GraphQLObjectType({
	name:'Comment',
	description:'Comment entity',
	fields:()=>{
		return {
			id:{
				type:GraphQLInt,
				resolve(comment){
					return comment.id;
				}
			},
			comment:{
				type:GraphQLString,
				resolve(comment){
					return comment.comment;
				}
			},
			user:{
				type:User,
				resolve(comment){
					return comment.getUser();
				}
			}
		}
	},

});

const Query=new GraphQLObjectType({
	name:"Query",
	description:"Query to retrieve data",
	fields:()=>{
		return {
			users:{
				type:new GraphQLList(User),
				args:{
					id:{
						type:GraphQLInt
					},
					firstName:{
						type:GraphQLString
					},
					lastName:{
						type:GraphQLString
					}
				},				
				resolve(root,args){
					return db.models.user.findAll({where:args});
				}
			},
			comments:{
				type:new GraphQLList(Comment),
				resolve(root,args){
					return db.models.comment.findAll({where:args});
				}
			}
		}
	}
});

const Schema=new GraphQLSchema({
	query:Query
}); 

export default Schema;