const {deleteRouteFromID, getRouteByStartFinishId, getStartStation, getStartStationByStartId, postNewRoute, getAllRoutes, getRouteByStartStation } = require('../models/db.routes')

function fetchRouteByStartStation(req, res) {


        getRouteByStartStation(req.params.station_id)
                .then(data => res.status(200).send(data))
                .catch(err => console.log(err))


}

function fetchStartStationByStartId(req, res) {
        getStartStationByStartId(req.params.start_id)
                .then(data => res.status(200).send(data))
                .catch(err => console.log(err))


}

function fetchStartStation(req, res) {
        getStartStation()
                .then(data => res.status(200).send(data))
                .catch(err => console.log(err))


}

function fetchScheduleById(req, res) {

        getScheduleById(req.params.schedule_id)
                .then(data => res.status(200).send(data))
}

function addNewRoute(req, res) {
        // Check route does not already exist
        getRouteByStartFinishId(req.body.starting_station, req.body.finish_station)
                .then(result => {
                        if (!result) {
                                // if not then create
                                postNewRoute(req.body.starting_station, req.body.finish_station)
                                        .then(data => res.status(201).send(data))
                        } else {
                                res.status(200)
                        }
                })


}

function removeRouteFromId(req, res) {
        deleteRouteFromID(req.params.route_id)
        .then(data => res.status(201).send(data))
}

function fetchAllRoutes(req, res) {

        
        getAllRoutes()
                .then(data => res.status(200).send(data))
}

module.exports = {removeRouteFromId, fetchStartStation, fetchStartStationByStartId, addNewRoute, fetchAllRoutes, fetchRouteByStartStation }