const db = require('../config/index.js');

const getAllRoutes = () => db.manyOrNone(`SELECT * FROM train_routes`)

const getRouteByStartStation = (train_id) => db.oneOrNone('SELECT * FROM train_schedule WHERE train_id = $1', [train_id])

const getScheduleByDepTime = (departure_time) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time = $1`, [departure_time])

const postNewSchedule = (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator,route_id) => db.one(`INSERT INTO train_schedule (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, route_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, route_id])


const getScheduleFromToDepTime = (departure_time_from, departure_time_to) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time BETWEEN $1 AND $2`, [departure_time_from, departure_time_to])
// const getSchedule = (a,b) => db.manyOrNone(`SELECT * FROM train_schedule WHERE train_id = $2`, [a, b])

// const getSchedules = () => db.manyOrNone(`SELECT * FROM train_schedule`)

// const getDelays = () => db.manyOrNone(`SELECT * FROM delays`)




// const postDelay = (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id) => db.one(`INSERT INTO delays (date_of_delay, expected_date_departure,expected_arrival_time, expected_departure_time, cancelled, train_id) VALUES ($1, $2, $3, $4, false, $5) RETURNING *`, [date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id])

// const postCancelled = (date_of_delay, train_id) => db.one(`INSERT INTO delays (date_of_delay, cancelled, train_id) VALUES ($1, true, $2) RETURNING *`, [date_of_delay, train_id])

// const putScheduleArrivalTimeUpdate = (arrival_time, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_time = $1 WHERE train_id = $2 RETURNING *`, [arrival_time, train_id]);

// const putScheduleArrivalStationUpdate = (arrival_station, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_station = $1 WHERE train_id = $2 RETURNING *`, [arrival_station, train_id]);

// const putDelayArrivalTimeUpdate = (expected_arrival_time, delay_id) => db.oneOrNone(`UPDATE delays SET expected_arrival_time = $1 WHERE delay_id = $2 RETURNING *`, [expected_arrival_time, delay_id]);

module.exports = { getAllRoutes, getRouteByStartStation }