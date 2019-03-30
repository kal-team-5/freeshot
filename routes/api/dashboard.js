const express=require('express');
const router = express.Router();
//const mongoose = require('mongoose');

//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const keys= require('../../config/keys');
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
  .populate('user', ['name'])
  .then(user => res.json(user))
  .catch(err => res.status(404).json(err));

});

// @route   GET api/dashboard/username/:username (search bar)
// @desc    Get dashboard by username
// @access  Public 

router.get('/:username',(req,res) => {
 const errors = {};
  Profile.findOne({username:req.params.username})
  .populate('user', ['name'])
  .then(profile => {
    if(!profile){
        errors.nouser = 'There is no user exist of this username ';
        return res.status(404).json(errors);
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err))

});

// @route   GET api/profile/explore  (means all profile)
// @desc    Get all profiles
// @access  Public
router.get('/explore', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   post api/dashboard/follow/:id
// @desc    it will add user id in folowers profile and profile id in user following list
// @access  Private
router.post('/follow/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
  
    const errors = {}; 
    Profile.findOne({user:req.user.id})
    .then(profile => {
         Profile.findById(req.params.id).then(profile => {

      if(profile.followers.filter(followers => followers.user.toString() === req.user.id).length > 0)
      {
        return res
              .status(400)
              .json({ alreadyfollower: 'User already in follow list' });
      }
         //add user id in following list
         profile.followers.unshift({ user: req.user.id });
         profile.save().then(profile => res.json(profile));
        
     })
      .catch(err => res.status(404).json({profile:'no profile exist'}));
       if(profile.following.filter(folowing => following.user.tostring()===req.params.id)>0)
       {
        return res
        .status(400)
        .json({ alreadyfollower: 'User already in follow list' });
       }
       profile.following.unshift({ user: req.params.id });
       profile.save().then(profile => res.json(profile));
       
     })
     .catch(err => res.status(404).json({profile:'no profile exist'}));
  }); 
  
  // @route   delete api/dashboard/follow/:id
  // @desc    it will delete user id from follower profile and following id from user profile
  // @access  Private
  router.delete('/follow/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {

    const errors = {}; 
     Profile.findOne({user:req.user.id})
     .then(profile => {
      Profile.findById(req.params.id).then(profile => {

      if(profile.followers.filter(followers => followers.user.toString() === req.user.id).length == 0)
      {
      return res
            .status(400)
            .json({ alreadyfollower: 'User already in follow list' });
      }
      //delete user id in following list
      const removeIndex = profile.followers.map(item => item._id.toString()).indexOf(req.params.follower_id);
        // Splice follower id out of array  
         profile.follower.splice(removeIndex, 1);
         profile.save().then(profile => res.json(profile));
      
  })
    .catch(err => res.status(404).json({profile:'no profile exist'}));
    if(profile.following.filter(folowing => following.user.tostring()===req.params.id) == 0)
    {
      return res
      .status(400)
      .json({ alreadyfollower: 'User already in follow list' });
    }

    const removeIndex = profile.following.map(item => item._id.toString()).indexOf(req.params.following_id);
    profile.following.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
    
  })
  .catch(err => res.status(404).json({profile:'no profile exist'}));
  }); 
    

  // @route   GET api/dashboard/following list
  // @desc     get to user dashboard whos is following
  // @access  Public 
  router.get('/following',(req,res) =>{
    const errors = {};
    Profile.find()
    .then(profile => {
        if(!profile){
            errors.nouser = 'there are no profile list';
            return res.status(404).json(errors);
          }
        if(!profile.following.user){
          errors.nouser = 'there are no user in following list';
          return res.status(404).json(errors);
        }  
          res.json(profile.following.user);
    })
    .catch(err => res.status(404).json({profile:'no profile exist'}));
    
  });

// @route   GET api/dashboard/follower list
// @desc     get to user dashboard whos is following
// @access  Public 
router.get('/follow',(req,res) =>{
  const errors = {};
  Profile.find()
  .then(profile => {
      if(!profile){
          errors.nouser = 'there are no profile exist';
          return res.status(404).json(errors);
        }
        if(!profile.followers.user){
          errors.nouser = 'there are no user follow list';
          return res.status(404).json(errors);
        }  
        res.json(profile.followers.user);
  })
  .catch(err => res.status(404).json({profile:'no profile exist'}));
  
});


// @route   Dashboard api/dashboard
// @desc    Create or edit user profile
// @access  Private

router.post('/',
   passport.authenticate('jwt',{session:false}),
  (req,res) =>{
     const {errors,isValid} = validateProfileInput(req.body);

     //check validation
     if(!isValid){
         //return errors with 400 status
        return res.status(400).json(errors);
     }
  //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    
    if(req.body.username) profileFields.username = req.body.username;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.phone) profileFields.phone = req.body.phone;
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
             Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
             ).then(profile => res.json(profile));
         }else {
             //create

             //check if username exists
             Profile.findOne({username:profileFields.username})
             .then(profile => {
                if (profile) { 
                 errors.username='that username already exist';
                 res.status(400).json(errors);
                }
                //save profile
                new Profile(profileFields).save().then(profile => res.json(profile));  
            });
        }
      });
    });


 // @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
   
    module.exports = router;