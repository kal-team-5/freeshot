const express = require('express');
const router = express.Router();
//Add gravatar???
const bcrypt = require('bcryptjs');

//Add user model when done

// @route   POST api/user/register
// @desc    Register user
// @access  public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).json({email: 'Email is in use'});
        } else {

            //can leave in if we want to implement gravatar or figure out another option

            //   const avatar = gravatar.url(req.body.email, {
            //       s: '200',
            //       r: 'pg',
            //       d: 'mm'
            //   });

            //Will match keys with ones from the model when it is up
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: ''
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err){
                    return res.status(400).json({password: 'Failed encrypting'});
                }

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err){
                        return res.status(400).json({password: 'Failed hashing'});
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })

        }
    })
    .catch(err => console.log(err));
});

// @route   POST api/user/login
// @desc    Login user
// @access  public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    User.findOne({email})
    .then(user => {
        if (!user){
            return res.status(400).json({email: 'user not found'});
        }

        //check password

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch){
                return res.json({msg: 'Success'});
            }
            return res.status(400).json({password: 'Password incorrect'});
        });
    })
    .catch(err => console.log(err));
})


module.exports = router;