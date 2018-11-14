const db = require('../config/index.js');


const getAllSchedules = () => db.manyOrNone('SELECT * FROM train_schedule');

const getScheduleById = (train_id) => db.oneOrNone('SELECT * FROM train_schedule WHERE train_id = $1', [train_id]);

const getScheduleByDepTime = (departure_time) => db.manyOrNone('SELECT * FROM train_schedule WHERE departure_time = $1', [departure_time]);

const postNewSchedule = (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator,route_id) => db.one('INSERT INTO train_schedule (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, route_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, route_id]);

const getSchedulesByRouteIDAndTime = (route_id, departure_time_from, departure_time_to) => db.manyOrNone('SELECT * FROM train_schedule WHERE route_id=$1 AND departure_time BETWEEN $2 AND $3', [route_id, departure_time_from, departure_time_to]);

const getSchedulesByTime = (departure_time_from, departure_time_to) => db.manyOrNone('SELECT * FROM train_schedule WHERE departure_time BETWEEN $1 AND $2', [departure_time_from, departure_time_to]);


const getSchedulesAndRoutesByTime = (from, to) => db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_schedule ON train_schedule.route_id=train_routes.route_id WHERE train_schedule.departure_time BETWEEN $1 AND $2', [from, to]);

const getSchedulesWithStationByTime = (dep_time) => db.manyOrNone ('SELECT * FROM train_schedule INNER JOIN train_routes ON train_schedule.route_id=train_routes.route_id INNER JOIN train_routes ON train_stations.station_id=train_routes.starting_station WHERE train_schedule.departure_time=$1', [dep_time]);

const getSchedulesByRouteID = (route_id) => db.manyOrNone('SELECT * FROM train_schedule WHERE route_id=$1', [route_id]);

const getScheduleFromToDepTime = (departure_time_from, departure_time_to) => db.manyOrNone('SELECT * FROM train_schedule WHERE departure_time BETWEEN $1 AND $2', [departure_time_from, departure_time_to]);

const deleteSchedule = (train_id) => db.query('DELETE FROM performance WHERE train_id = $1', [train_id]).then(() =>  db.query('DELETE FROM train_schedule WHERE train_id = $1', [train_id]));
    
   


module.exports = {deleteSchedule, getSchedulesWithStationByTime, getSchedulesAndRoutesByTime, getSchedulesByTime, getSchedulesByRouteIDAndTime, getSchedulesByRouteID, getScheduleFromToDepTime, postNewSchedule, getAllSchedules, getScheduleById, getScheduleByDepTime};