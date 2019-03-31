const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
//const User = mongoose.model("user");
const User = require("../models/User");
const keys = require("../config/keys");

const opts = {
  //read jwt-bearer token from header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); //1st parameter-error,2nd-parameter-information to be passed
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
