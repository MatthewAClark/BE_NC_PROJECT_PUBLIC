const { getAllRoutes, getRouteByStartStation } = require('../models/db.routes')

function fetchRouteByStartStation(req, res) {

      
                getRouteByStartStation(req.params.station_id)
                .then(data => res.status(200).send(data))
        
       
}

function fetchScheduleById(req, res) {

        getScheduleById(req.params.schedule_id)
                .then(data => res.status(200).send(data))
}

function addNewSchedule(req, res) {
        postNewSchedule(req.body.train_uid, req.body.train_departure_origin, req.body.train_arrival_destination, req.body.arrival_time, req.body.departure_time, req.body.train_operator, req.body.route_id)
        .then(data => res.status(201).send(data))
}


function fetchAllRoutes(req, res) {

                console.log('are we here too?')
                getAllRoutes()
                        .then(data => res.status(200).send(data))
 }

module.exports = { fetchAllRoutes, fetchRouteByStartStation }