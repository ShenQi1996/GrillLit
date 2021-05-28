const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

router.get('/user/:userId', (req, res) => {
    User.find({ _id: req.params.userId })
        .sort({ username: -1 })   
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nouserfound: 'No user found'}));
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

router.get('/allusers', (req, res) => {
    User.find()
        .sort({ username: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ username: req.body.username })
    .then(user => {
        if(user){
            return res.status(400).json({ username: "This username is taken"});
        }
    });
    
    User.findOne({ email: req.body.email  })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" });
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log( err); //throw err; 
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});


router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user){
                return res.status(404).json({ email: "This user does not exist"});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                        };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Beare " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json( {password: "Incorrect password"});
                    }
                });
        });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
    status: 'You are logged out!'
 });
});

module.exports = router;
