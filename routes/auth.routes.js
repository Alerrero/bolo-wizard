const express = require('express');
const router = express.Router();
const passport = require('passport')

const Artist = require('../models/artist-model')

// Endpoints
router.get('/', (req, res) => res.render('index'))

// User login
router.get('/login', (res, req) => res.render('auth/login', {errorMsg: req.flash('error')}))

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

// Registration
router.get('/register', (req, res) => res.render('auth/register'))

router.post('/register', (req, res, next) => {

    const { accountType, email, password, artisticName, firstName, lastName, musicURL } = req.body

    Artist
        .findOne({ email })
        .then(user => {
            if (user) {
                console.log('email:', email)
                res.render('auth/register', { errorMsg: "Email already registered"})
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            Artist
                .create({ accountType, email, password: hashPass, artisticName, firstName, lastName, musicURL })
                .then(() => res.redirect("/"))
                .catch(() => res.render('auth/register', {errorMsg: 'Server error'}))
        })
        .catch(error => next(new Error(error)))

})

// Log out
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})

module.exports = router