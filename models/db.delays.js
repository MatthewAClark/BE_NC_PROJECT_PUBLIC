const db = require('../config/index.js');





 const getAllDelays = () => db.manyOrNone(`SELECT * FROM performance`)

const getDelayByTrainId = (train_id) => db.manyOrNone(`SELECT * FROM performance WHERE train_id=$1`, [train_id])

const getDelaysWithSchedules = () => db.manyOrNone(`SELECT * FROM performance INNER JOIN train_schedule ON train_schedule.train_id=performance.train_id INNER JOIN train_routes ON train_schedule.route_id=train_routes.route_id `)

const postDelay = (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_status, train_id) => db.one(`INSERT INTO performance (date_of_delay, expected_date_departure,expected_arrival_time, expected_departure_time, train_status, train_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_status, train_id])

// const postCancelledTrain = (date_of_delay, train_id) => db.one(`INSERT INTO delays (date_of_delay, cancelled, train_id) VALUES ($1, true, $2) RETURNING *`, [date_of_delay, train_id])

// const putScheduleArrivalTimeUpdate = (arrival_time, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_time = $1 WHERE train_id = $2 RETURNING *`, [arrival_time, train_id]);

// const putScheduleArrivalStationUpdate = (arrival_station, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_station = $1 WHERE train_id = $2 RETURNING *`, [arrival_station, train_id]);

// const putDelayArrivalTimeUpdate = (expected_arrival_time, delay_id) => db.oneOrNone(`UPDATE delays SET expected_arrival_time = $1 WHERE delay_id = $2 RETURNING *`, [expected_arrival_time, delay_id]);

module.exports = {getDelaysWithSchedules, getDelayByTrainId, getAllDelays, postDelay}