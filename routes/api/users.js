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
//const validateRegisterInput = require ('../../validation/register');
//const validateLoginInput = require ('../../validation/login');


//router.get('/test',(req,res) => res.json({msg:'users api works'}));

//@ route Post api/users/register
//@desc Register user
//@ access public 

router.post('/register',(req,res) => {
    //const {errors,isValid} = validateRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
   User.findOne({email: req.body.email})
   .then(user => {
       if (user) {
           errors.email= 'Email already exists';
           return res.status(400).json(errors);
       } else {
          /* const avatar = gravatar.url(req.body.email,{
               s:'200',
               r:'pg',
               d:'mm'
           });*/
           const newUser = new User({
               name: req.body.name,
               email:req.body.email,
               password:req.body.password,
               avatar         //avatar:avatar
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

//@ route Post api/users/register
//@desc login user
//@ access public 

router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const {errors,isValid} = validateLoginInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({email})
     .then(user =>{
         if(!user){
             errors.email ='user not found';
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
                    avatar: user.avatar
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
        email:req.user.email

    });

}
)

module.exports = router;