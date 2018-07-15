
const db = require('../config/index.js');

const getScheduleByTime = (departure_time) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time = $1`, [departure_time])

const getSchedule = (a,b) => db.manyOrNone(`SELECT * FROM train_schedule WHERE train_id = $2`, [a, b])

const getSchedules = () => db.manyOrNone(`SELECT * FROM train_schedule`)

const getDelays = () => db.manyOrNone(`SELECT * FROM delays`)

const postSchedule = (train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator) => db.one(`INSERT INTO train_schedule (train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator])


const postDelay = (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id) => db.one(`INSERT INTO delays (date_of_delay, expected_date_departure,expected_arrival_time, expected_departure_time, cancelled, train_id) VALUES ($1, $2, $3, $4, false, $5) RETURNING *`, [date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id])

const postCancelled = (date_of_delay, train_id) => db.one(`INSERT INTO delays (date_of_delay, cancelled, train_id) VALUES ($1, true, $2) RETURNING *`, [date_of_delay, train_id])

module.exports = { postCancelled, getSchedules, postSchedule, postDelay, getDelays, getSchedule, getScheduleByTime}

