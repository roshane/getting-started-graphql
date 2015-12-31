import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

var app=express();


const PORT=3000;

app.use('/',graphqlHTTP({
	schema:schema,
	pretty:true,
	graphiql:true
}));

app.listen(PORT,()=>{
	console.log(`application started on http://localhost:${PORT}`);
})
