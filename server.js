const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const app  = express();

const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');

const dashboard = require('./routes/api/dashboard');

//Body parser middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//conect to db
mongoose
.connect(db)
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//psssport config
require('./config/passport')(passport);


app.get('/',(req,res) => res.send('hello!'));

//first route
app.use('/api/user',users);
app.use('/api/dashboard',dashboard);


const port = process.env.PORT || 5200;
app.listen(port,() => console.log(`server running on port ${port}`));