const express = require('express')
const router = express.Router()
const axios = require('axios')

const ticketmasterVenues = 'https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=ES&apikey=HdYZa33NpSQm7RcffP412uoFrL5obLRL'

const removeDups = (someArr) => someArr.filter((v,i) => someArr.indexOf(v) === i)
const normalizeText = (someStrg) => someStrg.normalize('NFD').replace(/[\u0300-\u036f]/g,"")

const objectRender = (venuesArr) => {
    // const citiesArr = []
    // const citiesArrObj = []

    // venuesArr.forEach(elm => {
    //     citiesArr.push(elm.city)
    // })

    // const newArray = removeDups(citiesArr)

    // newArray.forEach(elm => {
    //     const citiesObj = {}
    //     citiesObj.name = elm
    //     citiesObj.normalizeName = normalizeText(elm.name)
    //     citiesArrObj.push(citiesObj)
    // })

    // return citiesArrObj
}


// Endpoints
router.get('/', (req, res) => {

    axios.get(ticketmasterVenues)
        .then(response => {
            const citiesArr = []

            const venuesObj = response.data._embedded.venues

            console.log(objectRender(venuesObj))
            //const uniqueCities = removeDups(citiesArr).sort()

            res.render('index', {uniqueCities: removeDups(citiesArr).sort()})
        })
        .catch(err => console.log('Error:', err))

})
router.post('/', (req, res) => {
    const city = req.body.city
    res.redirect(`/events/${city}`)
})







module.exports = router