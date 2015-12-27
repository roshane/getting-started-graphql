'use strict';

var EventEmitter=require('events').EventEmitter;


class Customer extends EventEmitter{	

	constructor(){
		super()
		this.name="";
		this.age=0;
	}

	setAge(age){
		this.emit('updateAge',age);
		this.age=age;
	}

	getAge(){
		return this.age;
	}

	setName(name){
		this.emit('updateName',name);
		this.name=name;
	}

	getName(){
		return this.name;
	}

	toString(){
		return "Age : "+this.age+" Name : "+this.name;
	}


}
module.exports=Customer;