const db = require('../config/index.js');

const getAllDepartures = (route_id, departure_time_from, departure_time_to) => db.manyOrNone(`SELECT * FROM train_routes INNER JOIN train_schedule ON train_schedule.route_id=train_routes.route_id WHERE train_schedule.route_id=$1 AND train_schedule.departure_time BETWEEN $2 AND $3`, [route_id, departure_time_from, departure_time_to])

// const getScheduleById = (train_id) => db.oneOrNone('SELECT * FROM train_schedule WHERE train_id = $1', [train_id])

// const getScheduleByDepTime = (departure_time) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time = $1`, [departure_time])

// const postNewSchedule = (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, user_starting_station, user_finish_station) => db.one(`INSERT INTO train_schedule (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, user_starting_station, user_finish_station) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, user_starting_station, user_finish_station])


// const getScheduleFromToDepTime = (departure_time_from, departure_time_to) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time BETWEEN $1 AND $2`, [departure_time_from, departure_time_to])

module.exports = { getAllDepartures }