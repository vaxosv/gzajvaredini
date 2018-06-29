const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models/user");
const expressValidator = require('express-validator');
const passport = require ('passport'); 

router.get("/register", function (req, res) {
    res.render("userregistration")
})
router.get("/login", function (req, res) {
    res.render("userlogin")
})
router.get("/userprofile", (req, res) => {
    res.render("userprofile")
})


//post
router.post("/register", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2

    // bug checkBody validatria shemoisatani 
    // req.checkBody("name", "name is required").notEmpty()
    // req.checkBody("emain", "emain is required").notEmpty()
    // req.checkBody("emain", "emain is not waled").isEmain()
    // req.checkBody("username", "username is required").notEmpty()
    // req.checkBody("password", "password is required").notEmpty()
    // req.checkBody("password2", "passwords do not match").equals(password)

    // let errors = req.validationErrors()

    // if (errors) {
    //     res.render("userregistration", {
    //         errors: errors
    //     })
    // } else {
    let newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
    })

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return
            }

            newUser.password = hash
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    return
                } else {
                    res.redirect('/user/login')
                }
            })
        });
    })
    // }

})

router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/user/login',
    })(req, res, next);
  });


module.exports = router;