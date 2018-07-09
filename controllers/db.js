const { getSchedules, postSchedule } = require('../models/db');

function fetchSchedules(req, res) {
    getSchedules()
    .then(data => res.status(200).send(data))
}

function addSchedule(req, res) {
    postSchedule(req.body.train_uid, req.body.departure_station, req.body.arrival_station, req.body.departure_time, req.body.arrival_time, req.body.train_operator)
    .then(newSchedule => res.status(201).send({newSchedule: newSchedule}))
}

function addDelay(req, res) {
    postDelay()
}

module.exports = { fetchSchedules, addSchedule };