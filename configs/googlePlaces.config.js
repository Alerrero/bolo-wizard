const axios = require('axios')

class googlePlacesAPI {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place'
        })
    }

    getPlace (venue, city) {
        return this.api.get(`/findplacefromtext/json?input=${venue}%20${city}&inputtype=textquery&fields=photos,formatted_address,name,rating&key=${process.env.MAPSKEY}`
    )}
    getPhoto (photoRef) {
        return this.api.get(`/photo?photoreference=${photoRef}&key=${process.env.MAPSKEY}`)
    }
}

module.exports = googlePlacesAPI