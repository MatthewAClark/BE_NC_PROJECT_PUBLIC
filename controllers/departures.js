
const {getStationTimetable, getServiceRoute, getStationDepartures, getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`);


function fetchStationDepartures(req, res) {
    getStationTimetable(req.params.id,)
        .then(departures => res.status(200).send(departures))

}

function fetchStationTimetable(req, res) {
    getStationTimetable(req.params.id,  req.query.destination)
        .then(departures => res.status(200).send(departures))

}

function fetchTrainService(req, res) {

    getTrainServiceLive(req.params.id, req.query.date)
        .then(service => {

            res.status(200).send(service.data)
        })

}

function fetchServiceRoute(req, res) {
    getServiceRoute(req.params.id, req.query.destination)
        .then(route => res.status(200).send(route))
}


module.exports = { fetchStationTimetable, fetchServiceRoute, fetchStationDepartures, fetchTrainService }