const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')
const { checkLoggedIn, checkAdmin, checkArtist, checkApproved } = require('./../middleware')
const { isAdmin } = require('../utils')
const { isArtist } = require('../utils')
const Artist = require('../models/artist.model')

// Admin page
router.get('/admin-page', checkLoggedIn, checkAdmin, (req, res) => {
    Artist
        .find({approve: false})
        .then(artists => res.render('user-pages/admin-page', {artists}))
})

router.post('/admin-page/update/:id', (req, res) => {
    const artistID = req.params.id
    const approved = {approve: true}
    Artist
        .findByIdAndUpdate(artistID, approved)
        .then(() => res.redirect('/user/admin-page'))
        .catch(err => console.log(err))

})

router.post('/admin-page/delete/:id', (req, res) => {
    const artistID = req.params.id

    Artist
        .findByIdAndRemove(artistID)
        .then(() => res.redirect('/user/admin-page'))
        .catch(err => console.log(err))
        
})

// Profile
router.get('/profile', checkLoggedIn, checkArtist, checkApproved, (req, res) => res.render('user-pages/profile', { user: req.user }))

// Edit profile
router.get('/edit/:user_id', (req, res) => {
    
    const user_id = req.params.user_id

    Artist
        .findById(user_id)
        .then(user => res.render('user-pages/edit-profile', user))
        .catch(err => console.log(err))
})

// New event
router.get('/my-event', checkLoggedIn, checkArtist, checkApproved, (req, res, next) => res.render('user-pages/my-event'))

router.post('/my-event', (req, res) => {
    const { title, date, place, location, img } = req.body

    Event
        .create({ title, date, place, location, img })
        .then(event => res.redirect('/user/profile'))
        .catch(err => console.log(err))
})

// Edit event


module.exports = router