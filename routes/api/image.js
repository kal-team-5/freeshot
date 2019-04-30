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
    console.log("what is user coming as->" + (req));
    //Save the ImagePost
    const newImagePost = new ImageModel({
      user: req.user, //.id, //"5cba441d9979b100160cb7a6"
      url: req.body.url,
      caption: req.body.caption,
      username: req.body.username, //"TD_User1"
      avatar:
        "//www.gravatar.com/avatar/209e93119c56effd0c8bc4321a6bff34?s=200&r=pg&d=mm" //req.body.avatar
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
    Profile.findOne({ user: req.user /*id*/ }).then(profile => {
      ImageModel.findById(req.params.id)
        .then(image => {
          console.log(" Why undefined: " + JSON.stringify(image));
          // Check for post owner
          if (image.user.toString() !== req.user /*.id*/) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          image.remove().then(() => res.json({ success: true }));
        })
        .catch(error => {
          console.log(error);
          res.status(404).json({ imagenotfound: "No Image found" });
        });
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
          avatar:
            "//www.gravatar.com/avatar/209e93119c56effd0c8bc4321a6bff34?s=100&r=pg&d=mm", //req.body.avatar,
          user: req.user.id //"TD_User1"
        };

        // Add to comments array
        image.comments.unshift(newComment); //unshift adds element to the first position of the array

        // Save
        image.save().then(image => res.json(image.comments)); //returning the comments array
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ imagenotfound: "Error while adding comment" });
      });
  }
);

// @route   DELETE freeshot/dashboard/image/comment/:id/:comment_id
// @desc    Remove comment from Image Post
// @access  Private
ImageRouter.delete(
  "/comment/:id/:comment_id",
  //passport.authenticate("jwt", { session: false }),
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

// @route POST freeshot/dashboard/image/like/:id
// @desc Like the image post
// @access Private

ImageRouter.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      ImageModel.findById(req.params.id)
        .then(image => {
          if (
            image.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have already liked the image" });
          }

          // Adds user id to likes array
          image.likes.unshift({
            user: req.user.id
          });
          // Saves like
          image.save().then(image => res.json(image));
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ imagenotfound: "No image post found" });
        });
    });
  }
);

// @route POST freeshot/dashboard/image/unlike/:id
// @desc Unlikes the image post
// @access Private

ImageRouter.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      ImageModel.findById(req.params.id)
        .then(image => {
          if (
            image.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked this image" });
          }

          // Get remove index
          const removeIndex = image.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice likes array
          image.likes.splice(removeIndex, 1);
          // Save
          image.save().then(image => res.json(image));
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ imagenotfound: "No image post found" });
        });
    });
  }
);

module.exports = ImageRouter;
