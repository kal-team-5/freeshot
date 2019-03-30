const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyparser = require("body-parser");
const passport = require("passport");
const imageRouter = require("./routes/api/image-router");

//passport config
require("./config/passport")(passport);
//configure route for upload/postimage

const app = express();
//configure port
const port = process.env.PORT || 6000;
//server listening on port
app.listen(port, () => console.log(`Server running on port ${port}`));
//default route
app.get("/", (req, res) => res.send("Welcome to FreeShot Middleware"));
app.get("/freeshot", (req, res) => res.send("Welcome to FreeShot Middleware"));

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected"))
  .catch(err => console.log(err));

//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false })); //default url-encoding
app.use(bodyparser.json());
//passport middle ware
app.use(passport.initialize());

//Configure routes
app.use("/freeshot/image", imageRouter);
