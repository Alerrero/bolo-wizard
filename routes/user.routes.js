const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')
const { checkLoggedIn, checkRole } = require('./../middleware')
const { isAdmin } = require('../utils')
const { isArtist } = require('../utils')
const Artist = require('../models/artist.model')

// Admin page
router.get('/admin-page', checkLoggedIn, checkRole('ADMIN'), (req, res) => res.render('user-pages/admin-page'))

// Profile
router.get('/profile', checkLoggedIn, (req, res) => res.render('user-pages/profile', { user: req.user, isAdmin: isAdmin(req.user) }))

// Edit profile
router.get('/edit/:user_id', (req, res) => {
    
    const user_id = req.params.user_id

    Artist
        .findById(user_id)
        .then(user => res.render('user-pages/edit-profile', user))
        .catch(err => console.log(err))
})

// New event
router.get('/my-event', checkLoggedIn, checkRole(['ARTIST']), (req, res, next) => res.render('user-pages/my-event'))

router.post('/my-event', (req, res) => {
    const { title, date, place, location, img } = req.body

    Event
        .create({ title, date, place, location, img })
        .then(event => res.redirect('/user/profile'))
        .catch(err => console.log(err))
})

// Edit event


module.exports = router