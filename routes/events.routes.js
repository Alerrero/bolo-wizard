const express = require('express')
const router = express.Router()
const TicketmasterAPI = require('../configs/ticketmaster.config')
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

const ticketmasterHandler = new TicketmasterAPI()

// Events list

router.get('/:city', (req, res) => {

    const city = req.params.city

    ticketmasterHandler.getAllEvents(city, process.env.TMKEY)
    .then(response => {

        const eventsObj = response.data._embedded.events
        res.render('events/index', { eventsObj })

    })
    .catch(err => console.log('Error:', err))
})

// Details

router.get('/detalles/:_id', (req, res) => {

    const _id = req.params._id
    let event
    let artist

    ticketmasterHandler.getEvent(_id, process.env.TMKEY)
    .then(response => {
        event = response.data._embedded.events[0]
        const artistName = event._embedded.attractions[0].name
        return spotifyApi.searchArtists(artistName)
        
    })
    .then((data) => {
        artist = data.body.artists.items[0]
        const artistID = artist.id
        return spotifyApi.getArtistTopTracks(artistID, 'ES')
              
    })
    .then (artistTracks => {
        const tracks = artistTracks.body.tracks
        res.render('events/event-details', {event, tracks, artist})

    })      
    .catch(err => console.log('Error:', err))

})


module.exports = router
