let map

function initMap() {
    getDirections()

    map = new google.maps.Map(
        document.querySelector('#event-map'),
        { zoom: 15, center: { lat: 40.4637, lng: -3.7492 } }
    )
}


function getDirections() {
    const _id= window.location.pathname.slice(17)
    axios
        .get(`https://app.ticketmaster.com/discovery/v2/events.json?id=${_id}&apikey=HdYZa33NpSQm7RcffP412uoFrL5obLRL`)
        .then(response => pinEvent(response.data._embedded.events[0]))
        .catch(err => console.log(err))
}

function pinEvent(event) {

    if (!location) {
        return
    }

    let position = { lat: parseFloat(event._embedded.venues[0].location.latitude), lng: parseFloat(event._embedded.venues[0].location.longitude) }
    new google.maps.Marker({ position, title: event.name, map })
    map.setCenter(position, 10)

}