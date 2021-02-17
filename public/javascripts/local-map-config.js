let map

function initMap() {
    getDirections()

    map = new google.maps.Map(
        document.querySelector('#local-map'),
        { zoom: 15, center: { lat: 40.4637, lng: -3.7492 } }
    )
}


function getDirections() {
    const _id= window.location.pathname.slice(26)

    axios
        .get(`/api/events`)
        .then(response => {
            const currentEvent = response.data.filter(eachElm => eachElm._id === _id)
            pinEvent(currentEvent[0])
        })
        .catch(err => console.log(err))
}

function pinEvent(event) {

    if (!location) {
        return
    }

    let position = { lat: event.location.coordinates[0], lng: event.location.coordinates[1] }
    new google.maps.Marker({ position, title: event.title, map })
    map.setCenter(position, 10)

}