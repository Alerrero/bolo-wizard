const express = require('express')
const router = express.Router()
const axios = require('axios')

const ticketmasterVenues = 'https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=ES&apikey=HdYZa33NpSQm7RcffP412uoFrL5obLRL'

const removeDups = (someArr) => someArr.filter((v,i) => someArr.indexOf(v) === i)
const normalizeText = (someStrg) => someStrg.normalize('NFD').replace(/[\u0300-\u036f]/g,"")



// Endpoints
router.get('/', (req, res) => {

    axios.get(ticketmasterVenues)
        .then(response => {
            
            const venues = response.data._embedded.venues
            const cities = []
            const normalizedCities = []
            const finalCities = []

            //Haciendo Array solo con ciudades
            venues.forEach(elm => {
                cities.push(elm.city.name)
            })

            //Quitar duplicados
            const uniqueCities = removeDups(cities).sort()

            //Quitando caracteres especiales
            uniqueCities.forEach(elm => {
                normalizedCities.push(normalizeText(elm).toLowerCase())
            })

            uniqueCities.forEach ((elm, idx) => {
                const obj = {}
                obj.city = elm
                obj.normCity = normalizedCities[idx]
                finalCities.push(obj)
            })
            console.log(finalCities)

            

            res.render('index', { finalCities })
        })
        .catch(err => console.log('Error:', err))

})
router.post('/', (req, res) => {
    const city = req.body.city
    res.redirect(`/events/${city}`)
})







module.exports = router