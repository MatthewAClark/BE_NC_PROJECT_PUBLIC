const { postNewRoute, getAllRoutes, getRouteByStartStation } = require('../models/db.routes')

function fetchRouteByStartStation(req, res) {

      
                getRouteByStartStation(req.params.station_id)
                .then(data => res.status(200).send(data))
                .catch(err => console.log(err))
        
       
}

function fetchScheduleById(req, res) {

        getScheduleById(req.params.schedule_id)
                .then(data => res.status(200).send(data))
}

function addNewRoute(req, res) {
        postNewRoute(req.body.starting_station, req.body.finish_station)
        .then(data => res.status(201).send(data))
}


function fetchAllRoutes(req, res) {

                console.log('are we here too?')
                getAllRoutes()
                        .then(data => res.status(200).send(data))
 }

module.exports = { addNewRoute, fetchAllRoutes, fetchRouteByStartStation }