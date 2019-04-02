const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const app  = express();

const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');

//routing
const imageRouter = require("./routes/api/image");
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

app.get("/", (req, res) => res.send("Welcome to FreeShot Middleware"));

//first route
app.use('/freeshot/users',users);
app.use('/freeshot/dashboard',dashboard);
//Configure routes
app.use("/freeshot/image", imageRouter);

const port = process.env.PORT || 5300;
app.listen(port,() => console.log(`server running on port ${port}`));

app.get("/freeshot", (req, res) => res.send("Welcome to FreeShot Middleware"));

