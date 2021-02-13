const express = require('express')
const router = express.Router()

const axios = require('axios').default




// Endpoints
router.get('/:city', (req, res) => {

    const city = req.params.city
    const ticketmasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=[${city}]&size=30&sort=date,asc&apikey=HdYZa33NpSQm7RcffP412uoFrL5obLRL`
    

    axios.get(ticketmasterAPI)
    .then(response => {


        const eventsObj = response.data._embedded.events
        res.render('events/index', { eventsObj })

    })
    .catch(err => console.log('Error:', err))
})




module.exports = router
