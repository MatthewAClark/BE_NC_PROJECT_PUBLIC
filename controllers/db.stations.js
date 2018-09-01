const {getStationByCode, deleteStation, postStation, getAllStations, getStationById} = require('../models/db.stations')

// function fetchAllStations(req, res) {
   
//     getAllStations()
//         .then(data => res.status(200).send(data))
// }

function fetchStationById(req, res) {
   
        getStationById(req.params.station_id)
        .then(data => res.status(200).send(data))
}

function fetchStation(req, res) {
        if(req.query.code) {
        getStationByCode(req.query.code)
        .then(data => res.status(200).send(data))
        } else {
                getAllStations()
                .then(data => res.status(200).send(data))  
        }
}

function addNewStation(req, res) {
        // Check station does not already exist
        getStationByCode(req.body.station_code)
        .then(dbStation => {
                if(!dbStation) {
                        postStation(req.body.station_name, req.body.station_code, req.body.user_station_type)
                        .then(data => res.status(201).send(data))
                } else {
                        res.status(208)
                }
        })
   
        
}

function removeStation(req, res) {
   
        deleteStation(req.params.station_id)
        .then(data => res.status(201).send(data))
}
module.exports = {fetchStation, removeStation, addNewStation,  fetchStationById}