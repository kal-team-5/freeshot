const express = require("express");
const router = express.Router();
//const mongoose = require('mongoose');

//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const keys= require('../../config/keys');
const passport = require("passport");

//load user model
const User = require("../../models/User");
// Load Profile Model
const Profile = require("../../models/Profile");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET freeshot/dashboard
// @desc    Get current user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
        //console.log(" ***** ***** **** " + profile + ", " + JSON.stringify(profile));
        
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET freeshot/dashboard/username/:username
// @desc    Get dashboard by username (search bar)
// @access  Public

router.get("/username/:username", (req, res) => {
  const errors = {};

  Profile.findOne({ username: req.params.username })
    //.populate("user", ["avatar"])
    //.populate('user').exec(profile => {profile.user.avatar})
    .then(profile => {
      if (!profile) {
        //errors.nouser = 'There is no user exist of this username ';
        errors.noprofile = "There is no profile for the user";
        return res.status(404).json(errors);
      }
      //console.log(" ***** ***** **** " + profile + ", " + JSON.stringify(profile));
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET freeshot/dashboard/profile/explore  (means all profile)
// @desc    Get all profiles
// @access  Public
router.get("/profile/explore", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   post freeshot/dashboard/follow/:id,:name,:username
// @desc    it will add user id in folowers profile and profile id in user following list
// @access  Private
router.post(
  "/follow/:id,:name,:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const followInfo = {
          name: profile.name,
          username: profile.username,
          user: req.user.id
        };
        Profile.findOne({ user: req.params.id })
          .then(profile => {
            if (
              profile.followers.filter(
                followers => followers.user.toString() === req.user.id
              ).length > 0
            ) {
              return res
                .json(400)
                .json({ alreadyfollower: "User already in follow list" });
            }
            //add user id in following list
            profile.followers.unshift(followInfo);
            profile.save().then(profile => res.json(profile));
          })
          .catch(err => {
            console.log(err);
            res.status(404).json({ profile: "none profile exist" });
          });

        if (
          profile.following.filter(
            following => following.user.toString() === req.params.id
          ).length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyfollowing: "User already in following list" });
        }
        const followinInfo = {
          name: req.params.name,
          username: req.params.username,
          user: req.params.id
        };

        profile.following.unshift(followinInfo);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ profile: "no profile exist" });
      });
  }
);

// @route   post freeshot/dashboard/followers
// @desc    GET followers list
// @access  Private
router.get(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // console.log(username);
        if (!profile.followers.toString().length > 0) {
          return res.json(400).json({ nofollower: " No User follower list" });
        }
        //add user id in following list
        //profile.followers[0].populate('user',[username]);
        res.json(profile.followers);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ profile: "none profile exist" });
      });
  }
);

// @route   post freeshot/dashboard/following
// @desc    GET following list
// @access  Private
router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile.following.length > 0) {
          return res.json(400).json({ nofollower: " No User follower list" });
        }
        //add user id in following list
        res.json(profile.following);
        //console.log(profile.following[0].user.username);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ profile: "none profile exist" });
      });
  }
);

// @route   delete freeshot/dashboard/unfollow/:id
// @desc    it will delete user id from follower profile and following id from user profile
// @access  Private
router.delete(
  "/unfollow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Profile.findOne({ user: req.params.id }).then(profile => {
          if (
            profile.followers.filter(
              followers => followers.user.toString() === req.user.id
            ).length == 0
          ) {
            return res
              .status(400)
              .json({ notAfollower: "User is not in in follower list" });
          }
          //delete user id in following list
          const removeIndex = profile.followers
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice follower id out of array
          profile.followers.splice(removeIndex, 1);
          profile.save().then(profile => res.json(profile));
        });
        // .catch(err => res.status(404).json({profile:'no profile exist'}));
        if (
          profile.following.filter(
            following => following.user.toString() === req.params.id
          ).length == 0
        ) {
          return res
            .status(400)
            .json({ notfollowing: "User is not in following list" });
        }

        const removeIndex = profile.following
          .map(item => item.user.toString())
          .indexOf(req.params.id);
        profile.following.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json({ profile: "no profile exist" }));
  }
);

// @route   GET freeshot/dashboard/following/:username
// @desc     get to user dashboard who is following
// @access  Public
router.get("/following/:username", (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
    .then(profile => {
      if (!profile) {
        errors.nouser = "there are no profile list";
        return res.status(404).json(errors);
      }
      if (!profile.following.toString().length > 0) {
        errors.nouser = "there are no user in following list";
        return res.status(404).json(errors);
      }
      return res.json(profile.following);
    })
    .catch(err => res.status(404).json({ profile: "no profile exist" }));
});

// @route   GET freeshot/dashboard/follower/:username
// @desc     get to user dashboard whos is following
// @access  Public
router.get("/follower/:username", (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
    .then(profile => {
      if (!profile) {
        errors.nouser = "there are no profile exist";
        return res.status(404).json(errors);
      }
      if (!profile.followers.toString().length > 0) {
        errors.nouser = "there are no user follow list";
        return res.status(404).json(errors);
      }
      res.json(profile.followers);
    })
    .catch(err => res.status(404).json({ profile: "no profile exist" }));
});

// @route   Dashboard freeshot/dashboard
// @desc     edit user profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return errors with 400 status
      return res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.username = req.user.username;
    profileFields.name = req.user.name;

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

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create

        //check if username exists
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "that username already exist";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   DELETE freeshot/dashboard/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
