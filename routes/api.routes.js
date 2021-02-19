const express = require('express')
const router = express.Router()

const Event = require('../models/events.model')

router.get('/events', (req, res, next) => {
    Event
        .find()
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

module.exports = router
