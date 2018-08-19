const db = require('../config/index.js');





 const getAllDelays = () => db.manyOrNone(`SELECT * FROM performance`)

const getDelayByTrainId = (train_id) => db.manyOrNone(`SELECT * FROM performance WHERE train_id=$1`, [train_id])

const getDelaysWithSchedules = () => db.manyOrNone(`SELECT * FROM performance INNER JOIN train_schedule ON train_schedule.train_id=performance.train_id INNER JOIN train_routes ON train_schedule.route_id=train_routes.route_id `)

const postNewStatus = (schedule_date, expected_date_departure, expected_arrival_time, expected_departure_time, train_status, train_id) => db.one(`INSERT INTO performance (schedule_date, expected_date_departure,expected_arrival_time, expected_departure_time, train_status, train_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [schedule_date, expected_date_departure, expected_arrival_time, expected_departure_time, train_status, train_id])


// const putScheduleArrivalTimeUpdate = (arrival_time, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_time = $1 WHERE train_id = $2 RETURNING *`, [arrival_time, train_id]);

// const putScheduleArrivalStationUpdate = (arrival_station, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_station = $1 WHERE train_id = $2 RETURNING *`, [arrival_station, train_id]);

// const putDelayArrivalTimeUpdate = (expected_arrival_time, delay_id) => db.oneOrNone(`UPDATE delays SET expected_arrival_time = $1 WHERE delay_id = $2 RETURNING *`, [expected_arrival_time, delay_id]);

module.exports = {getDelaysWithSchedules, getDelayByTrainId, getAllDelays, postNewStatus}