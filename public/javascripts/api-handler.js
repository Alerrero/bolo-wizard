class EventsAPI {
    constructor() {
        this.app = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/events.json'
        })
    }
}

getSpainEvents = () => this.app.get('?classificationName=music&countryCode=ES&apikey=JGiOAmEvWBEwMIGOGniiz8eF10jaVNTp')