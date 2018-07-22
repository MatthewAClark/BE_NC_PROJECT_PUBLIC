
const {getStationData, getStationTimetable, getLiveRoute, getStationDepartures, getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`);


function fetchStationDepartures(req, res) {
    getStationDepartures(req.params.station_name)
        .then(departures => res.status(200).send(departures))

}

function fetchStationTimetable(req, res) {
    getStationTimetable(req.params.id,  req.query.destination)
    
        .then(data => res.status(200).send(data))
    
}

function fetchTrainService(req, res) {

    getTrainServiceLive(req.params.id, req.query.date)
        .then(res => {

            res.status(200).send(res.data)
        })

}

function fetchStationData(req, res) {
    console.log('herestation')
    console.log(req.params.station_name)
    getStationData(req.params.station_name)
    
    .then(station => {
        res.status(200).send(station.data)
    })
}

function fetchLiveRoute(req, res) {
    getLiveRoute(req.query.from, req.query.to)
        .then(live => res.status(200).send(live))
}


module.exports = { fetchStationData, fetchStationTimetable, fetchLiveRoute, fetchStationDepartures, fetchTrainService }