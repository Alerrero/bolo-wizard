const express = require('express')
const router = express.Router()
const TicketmasterAPI = require('../configs/ticketmaster.config')
const googlePlacesAPI = require('../configs/googlePlaces.config')
const SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFYID,
    clientSecret: process.env.SPOTIFYSECRET,
    redirectUri: 'http://www.example.com/callback'
});

spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

const Event = require('../models/events.model')
const Artist = require('../models/artist.model')


const ticketmasterHandler = new TicketmasterAPI()
const googleplacesHandler = new googlePlacesAPI()

const { normalizeText } = require('../utils')

// Events list

router.get('/:city', (req, res) => {

    let local
    const city = req.params.city
    
    const reg = new RegExp(`^${city}$`,`i`)

    Event
        .find({ city: reg })
        .then(localEvents => {
            local = localEvents
            return ticketmasterHandler.getAllEvents(city)
                
        })
        .then(response => {
            let eventsObj
            if (response.data._embedded === undefined) {eventsObj = null}
            else{
                eventsObj = response.data._embedded.events
                
                }
            res.render('events/index', {
                eventsObj,
                localEvents: local,
                city: city
            })
            
        })
        .catch(err => console.log('Error:', err))
})

router.post('/:city', (req, res) => {
    
    const city = req.params.city
    const today = new Date()
    const currentYear = today.getFullYear()
    const month = req.body.month
    
    const monthFirstDate = new Date (currentYear, parseInt(month) - 1, 1, 1)
    const monthLastDate = new Date (currentYear, parseInt(month), 0, 1)
    const lastDay = monthLastDate.getDate()

    let local

    const reg = new RegExp(`^${city}$`,`i`)


    Event
        .find({$and: [{city: reg, date: {$gt: monthFirstDate, $lt: monthLastDate}}]})
        .then(localEvents => {
            local = localEvents
            return ticketmasterHandler.getMonthEvents(month, currentYear,lastDay, city)
        })
        .then(response => {
            if (response.data._embedded === undefined) {res.redirect(`/eventos/${city}`)}
            else {const eventsObj = response.data._embedded.events
                res.render('events/index', {
                    eventsObj,
                    localEvents: local,
                    city: city
                })}
            
        })
        .catch(err => console.log('Error:', err))
})

// Details

router.get('/detalles/:_id', (req, res, next) => {

    const _id = req.params._id
    let event, artist, tracks

    ticketmasterHandler.getEvent(_id)
        .then(response => {
            event = response.data._embedded.events[0]
            const artistName = event._embedded.attractions[0].name
            return spotifyApi.searchArtists(artistName)

        })
        .then((data) => {

            artist = data.body.artists.items[0]
            if (artist) {
                const artistID = artist.id
                return spotifyApi.getArtistTopTracks(artistID, 'ES')
            } else {
                null
            }

        })
        .then(artistTracks => {
            if (artistTracks) {
                tracks = artistTracks.body.tracks
            }
            const venue = normalizeText(event._embedded.venues[0].name)
            const city = event._embedded.venues[0].city.name
            return googleplacesHandler.getPlace(venue, city)
        })
        .then(eventPlace => {
            const place = eventPlace.data.candidates[0]

            res.render('events/event-details', {
                event,
                tracks,
                artist,
                place
            })
        })
        .catch(err => console.log('Error:', err))
})

//Local events details
router.get('/locales-detalles/:_id', (req, res, next) => {

    const _id = req.params._id
    let artist, tracks, localEvent

    Event
        .findById(_id)
        .populate('artist')
        .then(event => {
            localEvent = event
            const venue = normalizeText(localEvent.place)
            const city = localEvent.city
            return googleplacesHandler.getPlace(venue, city)
        })
        .then(eventPlace => {
            const place = eventPlace.data.candidates[0]

            res.render('events/local-events-details', {
                localEvent,
                place
            })
        })

        .catch(err => console.log('Error:', err))
        })


module.exports = router