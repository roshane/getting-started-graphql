'use strict';
var emitter=require('events').EventEmitter;
var path=require('path');
var util=require('util');
var Customer=require('./util/Customer');

(function(){	
	var customer=new Customer();
	customer.on('updateAge',eventListner);
	customer.on('updateName',eventListner);

	customer.setName("roshane");
	customer.setAge(24);
	console.log(customer.toString());

	console.log("invoking the callback function");	
	console.log('-------------------------------')
	console.log("################################");


})();


function eventListner(args){
	console.log('eventTriggered with arguments '+args);
}
// let e=new emitter();
// e.on('start',function(){
// 	console.log('EventEmitter start triggered');
// })
// e.emit('start',getResult());


function myWrapper(result,callback){
	console.log(result);
	setTimeout(callback,1000);
}

function myCallback(error){	
	console.log(new Error("unexpected error ocurred"));
	console.log("myCallback function called");
}

function getResult(){
	return [1,2,3,4,5,6,7,8,9];
}