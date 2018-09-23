const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
const database = {
	users: [
		{
			id: '121',
			name: 'Alan',
			email: 'alanwu4321@gmail.com',
			password: 'Alanwu1111',
			entries: 0,  //track score, how many time he/she has submiited
			joined: new Date(), //john join the app 

		},
		{
		id: '122',
		name: 'john4',
		email: 'alanwu43210@gmail.com',
		password: 'banana',
		entries: 0,
		joined: new Date(),

	},


	],

}
app.get('/',(req,res) => {

	res.send(database.users)
})


app.post('/signin', (req,res) => {

	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {


		res.json(database.users[0])
	}  

	else {


		res.status(400).json('error singing in')
	}

})

app.post('/register',(req,res)=>{


const {email,name,password} =req.body; 

bcrypt.hash(password,null,null,function(err,hash){

	console.log(hash);
} )

database.users.push ({

		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),

})

res.json(database.users[database.users.length-1])



})


app.get('/profile/:id',(req,res) => {

const {id} = req.params;
let found = false;

database.users.forEach(user => {

console.log(user.id, 'user id')
console.log(id, 'param')


if(user.id === id){

	console.log(user.id, 'user id','from if')
console.log(id, 'param', 'from if')
	found = true;
	return res.json(user);
	
}


});

if (!found) {

	res.status(404).json('no such user');
}


})


app.put('/image',(req,res) => {

const {id} = req.body;
let found = false;

database.users.forEach(user => {


if(user.id === id){


	found = true;
	user.entries ++
	return res.json(user.entries);
	
}


})

if (!found) {

	res.status(404).json('no such user');
}






})

app.listen(3000, ()=>{
console.log('Success on port 3000')
})







/*

post man is the app (front end)

// res = this os working


/signin --> POST (sned ps through HTTPS not a body) = success/fail 

/register --> POST (Creating) = user

/profile/:userId(paramenter of user id) --> GET = user 

/image --> PUT (updating) --> user (object updated*)

*/