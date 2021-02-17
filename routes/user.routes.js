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
        .then(() => res.redirect('/usuario/admin-page'))
        .catch(err => console.log(err))

})

router.post('/admin-page/delete/:id', (req, res) => {
    const artistID = req.params.id

    Artist
        .findByIdAndRemove(artistID)
        .then(() => res.redirect('/usuario/admin-page'))
        .catch(err => console.log(err))
        
})

// Profile
router.get('/perfil', checkLoggedIn, checkArtist, checkApproved, (req, res) => {

    Event
        .find({artist: req.user._id})
        .then(artistEvents => {
            res.render('user-pages/profile', { user: req.user, events: artistEvents })
        })
    
})

// Edit profile
router.get('/editar/:user_id', checkLoggedIn, checkArtist, checkApproved, (req, res) => {
    
    const user_id = req.params.user_id

    Artist
        .findById(user_id)
        .then(user => res.render('user-pages/edit-profile', user))
        .catch(err => console.log(err))
})

router.post('/editar/:user_id', (req, res) => {
    const { artisticName, genre, img, spotifyURL, youtubeChannel, facebookPage, description } = req.body
    const user_id = req.params.user_id

    Artist
        .findByIdAndUpdate(user_id, { artisticName, genre, img, spotifyURL, youtubeChannel, facebookPage, description })
        .then(() => res.redirect('/usuario/perfil'))
        .catch(err => console.log(err))
})

// New event
router.get('/mi-evento', checkLoggedIn, checkArtist, checkApproved, (req, res, next) => res.render('user-pages/my-event'))

router.post('/mi-evento', (req, res) => {
    const { title, date, place, latitude, longitude, img, city } = req.body
    const location = {type: 'Point', coordinates: [latitude, longitude]}

    Event
        .create({ title, date, place, location, img, city, artist: req.user._id })
        .then(() => {
            res.redirect('/usuario/perfil')})
        .catch(err => console.log(err))
})

// Edit event
router.get('/mi-evento/editar/:id', checkLoggedIn, checkArtist, checkApproved, (req, res) => {
    const eventID = req.params.id

    Event
        .findById(eventID)
        .then(event => {
            const day = event.date.getDate(), 
            month = ('0' + (event.date.getMonth() + 1)).slice(-2), 
            year = event.date.getFullYear(), 
            hour = (event.date.getHours() + 1), 
            minute = (event.date.getMinutes() + 1) ,
            formattedDate = `${year}-${month}-${day}T${hour}:${minute}`
            console.log(formattedDate)
            res.render('user-pages/my-event-edit', {event, trueDate: formattedDate})
        })
        .catch(err => console.log(err))

})

router.post('/mi-evento/editar/:id', (req, res) => {
    const eventID = req.params.id
    const {title, date, city, place, latitude, longitude, img} = req.body
    const location = {type: 'Point', coordinates: [latitude, longitude]}

    Event  
        .findByIdAndUpdate(eventID, {title, date, city, place, location, img})
        .then(() => res.redirect('/usuario/perfil'))
        .catch(err => console.log(err))

})

router.post('/mi-evento/eliminar/:id', (req, res) => {
    const eventID = req.params.id

    Event
        .findByIdAndRemove(eventID)
        .then(() => res.redirect('/usuario/perfil'))
        .catch(err => console.log(err))
})


module.exports = router