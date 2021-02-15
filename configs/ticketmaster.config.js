const axios = require('axios')

class TicketmasterAPI {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2'
        })
    }

    getAllEvents (city, key) {
        return this.api.get(`/events.json?classificationName=music&city=[${city}]&size=30&sort=date,asc&apikey=${key}`
    )}
}

module.exports = TicketmasterAPI