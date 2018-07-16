const {deleteStation, postStation, getAllStations, getStationById} = require('../models/db.stations')

function fetchAllStations(req, res) {
   
    getAllStations()
        .then(data => res.status(200).send(data))
}

function fetchStationById(req, res) {
   
        getStationById(req.params.station_id)
        .then(data => res.status(200).send(data))
}

function addNewStation(req, res) {
   
        postStation(req.body.station_name, req.body.station_code, req.body.user_station_type)
        .then(data => res.status(201).send(data))
}

function removeStation(req, res) {
   
        deleteStation(req.params.station_id)
        .then(data => res.status(201).send(data))
}
module.exports = { removeStation, addNewStation, fetchAllStations, fetchStationById}