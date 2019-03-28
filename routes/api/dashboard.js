const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys= require('../../config/keys');
const passport = require('passport');

//load user model
const User = require('../../models/User');
// Load Profile Model
const Profile = require('../../models/Profile');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// @route   GET api/dashboard
// @desc    Get current user
// @access  Private
router.get('/',(req,res) =>{
    const errors = {}; 
  passport.authenticate('jwt',{session:false})

  Profile.findOne({user: req.user.id})
  .populate('user', ['name', 'photo'])
  .then(user => res.json(user))
  .catch(err => res.status(404).json(err));

});

// @route   GET api/dashboard/handle/:handle
// @desc    Get dashboard by handle
// @access  Public 

router.get('/handle',(req,res) => {
 const errors = {};
  Profile.findOne({handle:req.params.handle})
  .populate('user', ['name', 'photo'])
  .then(profile => {
    if(!profile){
        errors.nouser = 'There is no user exist of this handle ';
        return res.status(404).json(errors);
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))

});

// @route   GET api/dashboard/follow
// @desc    all user handle with photo
// @access  Public 
router.get('/follow',(req,res) => {
   const errors = {}; 
   Profile.find()
   .then(profile => {
       if(!profile){
           errors.nouser = 'there are no user to followed';
           return res.status(404).json(errors);
         }
         res.json(profile);
   })
   .catch(err => res.status(404).json({profile:'no profile exist'}));
   
});

// @route   GET api/dashboard/followed by
// @desc     get to user dashboard whos is following
// @access  Public 
router.get('/followed by/handle',(req,res) =>{
    const errors = {};
    Profile.findOne({handle:profile.handle})
    .populate('user', ['name', 'photo'])
    .then(profile => {
        if(!profile){
            errors.nouser = 'there are no user to followed';
            return res.status(404).json(errors);
          }
          res.json(profile);
    })
    .catch(err => res.status(404).json({profile:'no profile exist'}));
    
 });




// @route   Dashboard api/profile
// @desc    Create or edit user profile
// @access  Private

router.post('/edit',(req,res) =>{
     
    passport.authenticate('jwt',{session:false});
     const {errors,isValid} = validateProfileInput(req.body);

     //check validation
     if(!isValid){
         //return errors with 400 status
        return res.status(400).json(errors);
     }
//get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.email = req.user.email;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.phone) profileFields.location = req.body.phone;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.gender) profileFields.gender = req.body.gender;
  //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;   
    
   Profile.findOne({user:req.user.id})
     .then( profile => {
         if(profile){
             //update profile
             ProfilefindOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
             ).then(profile => res.json(profile));
         }else {
             //create

             //check if handle exists
             Profile.findOne({handle:profileFields.handle})
             .then(profile => {
                if (profile) { 
                 errors.handle='that handle already exist';
                 res.status(400).json(errors);
                }
                //save profile
                new Profile(profileFields).save().then(profile => res.json(profile));  
            });
        }
      });
    });
    module.exports = router;