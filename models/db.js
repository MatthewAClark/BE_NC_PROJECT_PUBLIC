
// const axios = require('axios')
// const api_id = require('../config/api.config').api_id
// const api_key = require('../config/api.config').api_key
// const api_url = require('../config/api.config').api_url
const db = require('../config/index.js');


const getSchedules = () => db.manyOrNone(`SELECT * FROM train_schedule`)

const postSchedule = (train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator) => db.one(`INSERT INTO train_schedule (train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [train_uid, departure_station, arrival_station, departure_time, arrival_time, train_operator])
module.exports = { getSchedules, postSchedule}