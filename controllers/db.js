const { getScheduleByTime, getSchedule, getSchedules, postSchedule, postDelay, postCancelled, getDelays } = require('../models/db');

function fetchSchedules(req, res) {
    getSchedules()
        .then(data => res.status(200).send(data))
}

function fetchScheduleByTime(req, res) {
    
    getScheduleByTime(req.query.departure_time)
        .then(data => res.status(200).send(data))
}

function addSchedule(req, res) {
    postSchedule(req.body.train_uid, req.body.departure_station, req.body.arrival_station, req.body.departure_time, req.body.arrival_time, req.body.train_operator)
        .then(newSchedule => res.status(201).send({ newSchedule: newSchedule }))
}

function addDelay(req, res) {
    postDelay(req.body.date_of_delay, req.body.expected_arrival_time, req.body.expected_departure_time, req.body.train_id)
        .then(newDelay => res.status(201).send({ newDelay: newDelay }))
}

function addCancelled(req, res) {
    postCancelled(req.body.date_of_delay, req.body.train_id)
        .then(newCancelled => res.status(201).send({ newCancelled: newCancelled }))
}

function fetchDelays(req, res) {
    getDelays()
        .then(data => res.status(200).send(data))
}

function fetchSchedule(req, res) {
    console.log('req params',req.query)
    getSchedule('train_id', req.query.train_id)
        .then(data => {
            if (data === null) {
                return res.status(404).send({ status: 404, err: `unable to find data` })
            }
            return res.status(200).send({ schedule: data })
        }
        )
}

module.exports = {addCancelled, fetchScheduleByTime, fetchSchedule, fetchSchedules, addSchedule, addDelay, fetchDelays };