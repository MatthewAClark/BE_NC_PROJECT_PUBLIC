
const axios = require('axios')
const api_id = require('../config/api.config').api_id
const api_key = require('../config/api.config').api_key
const api_url = require('../config/api.config').api_url
const db = require('../config/index.js');




// GET DATA 



const getLiveStatus = (stationCode) => {
  return  axios.get(`${api_url}/train/station/${stationCode}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true`)
  //return  axios.get(`${api_url}/train/station/${stationCode}/2018-07-09/10:00/timetable.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true&destination=BNP&from_offset=PT24:00`)
  .then(res => res.data)
//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}

const getStationTimetable = (stationCode, date, time) => {
  //return  axios.get(`${api_url}/train/station/${stationCode}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true`)
  return  axios.get(`${api_url}/train/station/${stationCode}///timetable.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&destination=LPY`)
  .then(res => res.data)


//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}

//Post new train service into database if train does not exist
const postTrain = (train_uid, departure_station, arrival_station,  arrival_time, departure_time, train_operator) => db.one(`INSERT INTO train_schedule (train_uid, departure_station, arrival_station, arrival_time, departure_time, train_operator) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [train_uid, departure_station, arrival_station, arrival_time,  departure_time, train_operator])

const postDelay = ( date_of_delay, expected_arrival_time, expected_departure_time, train_id) => db.one(`INSERT INTO delayed_train ( date_of_delay, expected_arrival_time, expected_departure_time, train_id) VALUES ($1, $2, $3, $4) RETURNING *`, [ date_of_delay, expected_arrival_time, expected_departure_time, train_id])

const getStoredTrain = (train_uid) => db.oneOrNone(`SELECT * FROM train_schedule WHERE train_uid = $1`, [train_uid])

const getAllTrains = () => db.manyOrNone(`SELECT * FROM train_schedule`)


module.exports = { getAllTrains, getLiveStatus, getStationTimetable, postTrain, getStoredTrain, postDelay}