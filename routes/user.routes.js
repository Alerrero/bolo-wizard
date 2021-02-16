const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')
const { checkLoggedIn, checkRole } = require('./../middleware')
const { isAdmin } = require('../utils')

// Admin page
router.get('/admin-page', checkLoggedIn, checkRole('ADMIN'), (req, res) => res.render('user-pages/admin-page'))

// Profile
router.get('/profile', checkLoggedIn, (req, res) => res.render('user-pages/profile', { user: req.user, isAdmin: isAdmin(req.user) }))

// New event
router.get('/my-event', (req, res) => res.render('events/my-event'))

router.post('/my-event', (req, res) => {
    const { title, date, place, location, img } = req.body

    Event
        .create({ title, date, place, location, img })
        .then(event => res.redirect('/profile'))
        .catch(err => console.log(err))
})


module.exports = router