const express = require("express");
//initialize the image-router
const ImageRouter = express.Router();
//json web token to read user info
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//Load Image model
const ImageModel = require("../../models/Image");
//Validation
const validateImageInput = require("../../validation/image-upload-validator");
const validateComments = require("../../validation/add-comments-validator");

// @route   GET freeshot/dashboard/image
// @desc    Get Image Posts
// @access  Public
ImageRouter.get("/", (req, res) => {
  ImageModel.find()
    .sort({ date: -1 })
    .then(images => {
      if (images.length == 0) {
        return res.status(200).json({ noimagesfound: "No Images found" });
      }
      res.json(images);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ noimagesfound: "No Images found" });
    });
});

// @route   GET freeshot/dashboard/image/:id
// @desc    Get Iamge Post by id
// @access  Public
ImageRouter.get("/:id", (req, res) => {
  ImageModel.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err =>
      res.status(404).json({ noimagesfound: "No Images found with that ID" })
    );
});

//@route POST freeshot/dashboard/image/upload
//@desc Post Images upload
//@access Private
ImageRouter.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate Input
    const { errors, isValid } = validateImageInput(req.body);
    if (!isValid) {
      return res.status(500).json(errors);
    }
    //Save the ImagePost
    const newImagePost = new ImageModel({
      user: req.user.id,
      url: req.body.url,
      caption: req.body.caption,
      username: req.body.username
      //avatar: req.body.avatar
    });
    newImagePost
      .save()
      .then(post => res.json(post))
      .catch(error => {
        console.log(error);
      });
  }
);

// @route   DELETE freeshot/dashboard/image/:id
// @desc    Delete Image post
// @access  Private
ImageRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      ImageModel.findById(req.params.id)
        .then(image => {
          // Check for post owner
          if (image.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          image.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ imagenotfound: "No Image found" })
        );
    });
  }
);

// @route   POST freeshot/dashboard/image/comment/:id
// @desc    Add comment to Image Post
// @access  Private
ImageRouter.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateComments(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    ImageModel.findById(req.params.id)
      .then(image => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          //avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        image.comments.unshift(newComment);

        // Save
        image.save().then(image => res.json(image));
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ imagenotfound: "No Images found" });
      });
  }
);

// @route   DELETE freeshot/dashboard/image/comment/:id/:comment_id
// @desc    Remove comment from Image Post
// @access  Private
ImageRouter.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ImageModel.findById(req.params.id)
      .then(image => {
        // Check to see if comment exists
        if (
          image.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = image.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        image.comments.splice(removeIndex, 1);

        image.save().then(image => res.json(image));
      })
      .catch(err => res.status(404).json({ imagenotfound: "No Image found" }));
  }
);

module.exports = ImageRouter;
