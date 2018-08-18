
const {getLiveStation, getStationData, getStationTimetable, getLiveRoute, getStationDepartures, getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`);


function fetchStationDepartures(req, res) {
    getStationDepartures(req.params.station_name)
        .then(departures => res.status(200).send(departures))
        .catch(err => console.log(err))

}

function fetchStationTimetable(req, res) {
    // console.log('here2here', req.params/)
    getStationTimetable(req.params.station_code,  req.query.destination)
    
        .then(data => res.status(200).send(data))
    .catch(err => console.log(err))
}

function fetchTrainService(req, res) {

    getTrainServiceLive(req.params.id, req.query.date)
        .then(res => {

            res.status(200).send(res.data)
        })
        .catch(err => console.log(err))

}

function fetchStationData(req, res) {
    console.log('herestation')
    console.log(req.params.station_name)
    getStationData(req.params.station_name)
    
    .then(station => {
        console.log('station...', station)
        res.status(200).send(station.data)
    })
    .catch(err => console.log(err))
}

function fetchLiveRoute(req, res) {
    getLiveRoute(req.query.from, req.query.to)
        .then(live => res.status(200).send(live))
        .catch(err => console.log(err))
}

function fetchLiveStation(req, res) {
    getLiveStation(req.params.station_code)
    .then(live => res.status(200).send(live))
        .catch(err => console.log(err))
}


module.exports = { fetchLiveStation, fetchStationData, fetchStationTimetable, fetchLiveRoute, fetchStationDepartures, fetchTrainService }