const { getServiceRoute, getStationDepartures, getTrainServiceLive } = require('../models/departures');


function fetchStationDepartures(req, res) {
        getStationDepartures(req.params.id)
            .then(departures => res.status(200).send(departures))

}

function fetchTrainService(req, res) {
   
        getTrainServiceLive(req.params.id, req.query.date)
            .then(service => {
               
                res.status(200).send(service.data)})

}

function fetchServiceRoute(req, res) {
    getServiceRoute(req.params.id, req.query.destination)
            .then(route => res.status(200).send(route))
}


module.exports = {fetchServiceRoute, fetchStationDepartures, fetchTrainService }