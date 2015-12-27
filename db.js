import Sequelize from "sequelize"
import ld from "lodash"
import Faker from "faker"

const username='user';
const password='password';
const database='relay';

var conn = new Sequelize(database, username, password, {
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
		type: Sequelize.STRING,
		field: 'first_name',
		allowNull:false
	},
	lastName: {
		type: Sequelize.STRING,
		field:'last_name',
		allowNull:false
	},
	age:{
		type:Sequelize.INTEGER,
		field:'age',
		allowNull:false
	}
}, {
	freezeTableName: true 
});

//COMMENTS TABLE DEFINITION
var Comment = conn.define('comment', {	
	comment: {
		type: Sequelize.STRING,
		field:'comment',
		allowNull:false
	}
}, {
	freezeTableName: true
});

//RELATIONSHIP DEFINITION
User.hasMany(Comment);
Comment.belongsTo(User);


conn.sync({force: true}).then(()=> {
  // Table created
  ld.times(10,function(){
  	return User.create({
  		firstName: Faker.name.firstName(),
  		lastName: Faker.name.lastName(),
  		age: Faker.random.number()%100
  	});

  });
});

conn.sync({force:true}).then(()=>{
	ld.times(10,function(){
		return Comment.create({
			comment:Faker.lorem.paragraph(),
			userId:Faker.random.number()%10
		})
	});
});

  export default conn;