const express = require('express')
const axios = require('axios').default
const router = express.Router()
const TicketmasterAPI = require('../configs/ticketmaster.config')

const SpotifyWebApi = require('spotify-web-api-node')
//TODO al env
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



// Endpoints
router.get('/:city', (req, res) => {

    const city = req.params.city
    //TODO cosnt ticketMasterHandler = axios.create()
    //TODO al env

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
    const ticketmasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?id=${_id}&apikey=${process.env.TMKEY}`
    //TODO al env
    axios.get(ticketmasterAPI)
    .then(response => {
        const event = response.data._embedded.events[0]
        const artistName = event._embedded.attractions[0].name
        spotifyApi.searchArtists(artistName)
        .then((data) => {
            const artist = data.body.artists.items[0]
            const artistID = artist.id
            return spotifyApi.getArtistTopTracks(artistID, 'ES')
            .then (artistTracks => {
                const tracks = artistTracks.body.tracks
                res.render('events/event-details', {event, tracks, artist})
            })            
        })
    })
    .catch(err => console.log('Error:', err))

})




module.exports = router
