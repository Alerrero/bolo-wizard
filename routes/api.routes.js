const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')

router.get('/events', (req, res) => {
    Event
        .find()
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router
