const axios = require('axios')

class TicketmasterAPI {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2'
        })
    }

    getAllEvents (city) {
        return this.api.get(`/events.json?classificationName=music&city=[${city}]&size=30&sort=date,asc&apikey=${process.env.TMKEY}`
    )}
    getAllVenues () {
        return this.api.get(`/venues.json?countryCode=ES&apikey=${process.env.TMKEY}`)
    }
    getEvent (id) {
        return this.api.get(`/events.json?id=${id}&apikey=${process.env.TMKEY}`)
    }
    getMonthEvents (month, year, day, city) {
        return this.api.get(`/events.json?classificationName=music&city=[${city}]&startDateTime=${year}-${month}-01T08:00:00Z&endDateTime=${year}-${month}-${day}T00:00:00Z&size=30&sort=date,asc&apikey=${process.env.TMKEY}`)
    }

}

module.exports = TicketmasterAPI