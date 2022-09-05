const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',	// localhost
    user : 'postgres',
    password : 'Elmango@1',
    database : 'Facial_Recognition_Brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

// / --> res = this is working
app.get('/', (req, res) => { res.send('success') })

// /signin --> POST request = success/fail
app.post('/signin', signin.handleSignIn(db, bcrypt))

// /register --> POST request = user
app.post('/register', register.handleRegister(db, bcrypt))

// /profile/:userId --> GET = user
app.get('/profile/:id', profile.handleProfileGet(db))

// /image --> PUT --> user (for the count/score)
app.put('/image', image.handleImage(db))

// /imageurl --> POST --> for the clarifai API
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, ()=> {
	console.log('app is running on port 3001')
});