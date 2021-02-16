const express = require('express')
const router = express.Router()
const TicketmasterAPI = require('../configs/ticketmaster.config')

const ticketmasterHandler = new TicketmasterAPI()

const removeDups = (someArr) => someArr.filter((v,i) => someArr.indexOf(v) === i)
const normalizeText = (someStrg) => someStrg.normalize('NFD').replace(/[\u0300-\u036f]/g,"")


// Endpoints
router.get('/', (req, res) => {

    ticketmasterHandler.getAllVenues()
        .then(response => {
            const venues = response.data._embedded.venues
            const cities = removeDups(venues.map(elm => elm.city.name).sort())                      //Cities with no dups array
            const normalizedCities = cities.map(elm => normalizeText(elm).toLowerCase())            //Normalized cities array

            const finalCities = cities.map((elm, idx) => {                                          //Array of objects w/ cities and normalizedCities
                const obj = {}
                obj.city = elm
                obj.normCity = normalizedCities[idx]
                return obj
            })
            
            res.render('index', { finalCities })
        })
        .catch(err => console.log('Error:', err))

})
router.post('/', (req, res) => {
    const city = req.body.city
    res.redirect(`/events/${city}`)
})

module.exports = router