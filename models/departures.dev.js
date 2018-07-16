
const axios = require('axios')
const api_id = require('../config/api.config').api_id
const api_key = require('../config/api.config').api_key
const api_url = require('../config/api.config').api_url





// GET DATA 

const getStationDepartures = (stationCode) => {
  return  axios.get(`${api_url}/train/station/${stationCode}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true&to_offset=PT23:59:00`)
  .then(res => res.data)
//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}

const getStationTimetable = (stationCode, destination) => {
  return  axios.get(`${api_url}/train/station/${stationCode}/timetable.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&to_offset=PT23:59:00&calling_at=${destination}`)
  .then(res => res.data)
//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}

const getServiceRoute = (origin, destination) => {
  return  axios.get(`${api_url}/train/station/${origin}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true&to_offset=PT23:59:00&calling_at=${destination}`)
  .then(res => res.data)
//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}

const getTrainServiceLive = (train_uid, date) => {
  return axios.get(`${api_url}/train/service/train_uid:${train_uid}/${date}//timetable.json?app_id=${api_id}&app_key=${api_key}&live=true`)

}

module.exports = {getStationTimetable, getServiceRoute, getStationDepartures, getTrainServiceLive}