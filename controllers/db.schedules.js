const {getSchedulesAndRoutesByTime, getSchedulesByTime, getSchedulesByRouteIDAndTime, getSchedulesByRouteID, getScheduleFromToDepTime, postNewSchedule, getAllSchedules, getScheduleById, getScheduleByDepTime } = require('../models/db.schedules')

const cronSchedule = require('../modules/autofetch').cronSchedule
const fetchSchedulesByHour = require('../modules/autofetch').fetchSchedulesByHour

function fetchSchedulesByRouteID(req, res) {

        if(req.query.departure_time_from) {

                getSchedulesByRouteIDAndTime(req.params.route_id, req.query.departure_time_from, req.query.departure_time_to)
                .then(data => res.status(200).send(data))
        } else {
                getSchedulesByRouteID(req.params.route_id)
                .then(data => res.status(200).send(data)) 
        }

        
}

function fetchSchedulesByTime(req, res) {

        if(req.query.departure_time_from) {

                getSchedulesByTime(req.query.departure_time_from, req.query.departure_time_to)
                .then(data => res.status(200).send(data))
        } 

        
}

function fetchSchedulesAndRoutesByTime(req, res) {

        if(req.query.from) {

                getSchedulesAndRoutesByTime(req.query.from, req.query.to)
                .then(data => res.status(200).send(data))
        } 

        
}

function fetchSchedules(req, res) {

        if(req.query.departure_time) {
                getScheduleByDepTime(req.query.departure_time)
                .then(data => res.status(200).send(data))
        }
        if(req.query.departure_time_from) {
                console.log('here from to')
                getScheduleFromToDepTime(req.query.departure_time_from, req.query.departure_time_to)
                .then(data => res.status(200).send(data))
        }
}

function fetchScheduleById(req, res) {

        getScheduleById(req.params.schedule_id)
                .then(data => res.status(200).send(data))
}

function addNewSchedule(req, res) {
        postNewSchedule(req.body.train_uid, req.body.train_departure_origin, req.body.train_arrival_destination, req.body.arrival_time, req.body.departure_time, req.body.train_operator, req.body.route_id)
        .then(data => {

  fetchSchedulesByHour()
  .then(res => {
      cronSchedule(res)
  })
        })
        .then(data => res.status(201).send(data))
}


function fetchAllSchedules(req, res) {

                console.log('are we here too?')
                getAllSchedules()
                        .then(data => res.status(200).send(data))
 }

module.exports = {fetchSchedulesAndRoutesByTime, fetchSchedulesByTime, fetchSchedulesByRouteID, fetchSchedules, fetchAllSchedules, fetchScheduleById, addNewSchedule }