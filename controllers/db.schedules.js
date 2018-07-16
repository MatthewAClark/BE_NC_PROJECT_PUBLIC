const { getScheduleFromToDepTime, postNewSchedule, getAllSchedules, getScheduleById, getScheduleByDepTime } = require('../models/db.schedules')

function fetchAllSchedules(req, res) {

        if (!req.query.departure_time) {
                getAllSchedules()
                        .then(data => res.status(200).send(data))
        }
        if(req.query.departure_time) {
                getScheduleByDepTime(req.query.departure_time)
                .then(data => res.status(200).send(data))
        }
        if(req.query.departure_time_from) {
                getScheduleFromToDepTime(req.query.departure_time_from, req.query.departure_time_to)
                .then(data => res.status(200).send(data))
        }
}

function fetchScheduleById(req, res) {

        getScheduleById(req.params.schedule_id)
                .then(data => res.status(200).send(data))
}

function addNewSchedule(req, res) {
        postNewSchedule(req.body.train_uid, req.body.train_departure_origin, req.body.train_arrival_destination, req.body.arrival_time, req.body.departure_time, req.body.train_operator, req.body.user_starting_station, req.body.user_finish_station)
        .then(data => res.status(201).send(data))
}

module.exports = { fetchAllSchedules, fetchScheduleById, addNewSchedule }