const { getAllDelays, postNewDelay } = require('../models/db.delays')

function fetchAllDelays(req, res) {

        
                getAllDelays()
                        .then(data => res.status(200).send(data))
        }
       

function fetchDelayById(req, res) {

        getDelayById(req.params.delay_id)
                .then(data => res.status(200).send(data))
}

function addNewDelay(req, res) {
        postNewDelay(req.body.date_of_delay, req.body.expected_date_departure, req.body.expected_arrival_time, req.body.expected_departure_time, req.body.cancelled, req.body.train_id)
        .then(data => res.status(201).send(data))
}

function addCancelledTrain(req, res) {
        postCancelledTrain(req.body.date_of_delay, req.body.train_id)
        .then(data => res.status(201).send(data))
}

module.exports = { fetchAllDelays, fetchDelayById, addNewDelay }