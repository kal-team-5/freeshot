const express = require("express");
//initialize the image-router
const imageRouter = express.Router();
//json web token to read user info
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//Load Image model
const imageModel = require("../../models/Image");
//Validation
const validateImageInput = require("../../validation/image-validator");

//@route POST freeshot/image/upload
//@desc Images upload
//@access Private
imageRouter.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input
    const { errors, isValid } = validateImageInput(req.body);
    if (!isValid) {
      return res.status(500).json(errors);
    }

    //Save the ImagePost
    const newImagePost = new imageModel({
      //user: req.user.id,
      user: req.body.id,
      url: req.body.url,
      caption: req.body.caption,
      username: req.body.name,
      avatar: req.body.avatar
    });

    newImagePost
      .save()
      .then(post => res.json(post))
      .catch(error => {
        console.log(error);
      });
  }
);

module.exports = imageRouter;
