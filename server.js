var path=require('path');
var express=require('express');


var app=express();

app.get('*',function(req,res){
	res.send('hello world');
});

app.listen(4444,function(){
	console.log('server is running at http://localhost:4444');
});