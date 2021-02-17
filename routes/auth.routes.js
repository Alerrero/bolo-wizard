const express = require('express');
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const { User } = require('../models/user.model')
const Artist = require('../models/artist.model')


// User login
router.get('/inicio', (req, res) => res.render('auth/login', {errorMsg: req.flash('error')}))

router.post('/inicio', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/inicio",
    failureFlash: true,
    passReqToCallback: true
}))

// Registration
router.get('/registro', (req, res) => res.render('auth/signup'))

router.post('/registro', (req, res, next) => {
    const { artistType, email, password, artisticName } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.render('auth/signup', { errorMsg: "Email ya registrado"})
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
        
            Artist
                .create({ artistType, userInfo: { email, password: hashPass }, artisticName })
                .then(() => res.redirect("/"))
                .catch(() => res.render('auth/signup', {errorMsg: 'Error de servidor'}))
        })
        .catch(error => next(new Error(error)))

})

// Log out
router.get('/cierre', (req, res) => {
    req.logout();
    res.redirect('/inicio')
})

module.exports = router