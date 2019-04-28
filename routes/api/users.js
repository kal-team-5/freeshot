const express=require('express');
const router = express.Router();
//const gravatar =require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys= require('../../config/keys');
const passport = require('passport');

//load user model
const User = require('../../models/User');
//load input validation
const validateRegisterInput = require ('../../validation/register');
const validateLoginInput = require ('../../validation/login');


//router.get('/test',(req,res) => res.json({msg:'users api works'}));

//@ route Post freeshot/users/register
//@desc Register user
//@ access public 

router.post('/register',(req,res) => {
     const {errors,isValid} = validateRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
   User.findOne({username: req.body.username})
   .then(user => {
       if (user) {
           errors.username= 'Username already exists';
           return res.status(400).json(errors);
       } else {
          /* const avatar = gravatar.url(req.body.email,{
               s:'200',
               r:'pg',
               d:'mm'
           });*/
           const newUser = new User({
               name: req.body.name,
               username:req.body.username,
               password:req.body.password
              // avatar         //avatar:avatar
           });
           bcrypt.genSalt(10,(err,salt) => {    //generate a salt(key) after going 10 cycle.
               if (err){
                   errors.password = 'failed encrypting';
                   return res.status(400).json(errors);
               }
               bcrypt.hash(newUser.password,salt,(err,hash) => {
                if (err){
                    errors.password = 'failed hashing';
                    return res.status(400).json(errors);
                }
                newUser.password=hash;
                newUser.save()
                 .then(user => res.json(user))
                 .catch(err => console.log(err));
               })
           })
       }
   })
   .catch(err => console.log(err));
});

//@ route Post freeshot/users/login
//@desc login user
//@ access public 

router.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const {errors,isValid} = validateLoginInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({username})
     .then(user =>{
         if(!user){
             errors.username ='username not found';
             return res.status(400).json(errors);
         }
         //check password
         bcrypt.compare(password,user.password)
         .then(isMatch => {
             if(isMatch){
                // return res.json({msg:'Success'});
                //user got matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username
                    
                };
                //sign token
                jwt.sign(payload, keys.secretOrKey,{expiresIn:3600 },
                    (err,token) => {
                        return res.json({
                            success:true,
                            token:'Bearer ' + token
                        });
                    }
                    )
                  // return res.json({token});
             }
             else {
                errors.password = 'password incorrect';
                return res.status(400).json(errors);
             }
             
         });
     })
     .catch(err => console.log(err));
});

//@ route get api/users/current
//@desc returns current user information
//@ access private

router.get(
'/current', 
passport.authenticate('jwt',{session:false}),
(req,res) => {
    res.json({
        id: req.user.id,
        name:req.user.name,
        username:req.user.username

    });

}
)

module.exports = router;