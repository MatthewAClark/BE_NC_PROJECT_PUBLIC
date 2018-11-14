
const axios = require('axios');
const api_id = require('../config/api.config').api_id;
const api_key = require('../config/api.config').api_key;
const api_url = require('../config/api.config').api_url;
const api_station = require('../config/api.config').api_station;




// GET DATA 

const getStationDepartures = (stationCode) => {
  return  axios.get(`${api_url}/train/station/${stationCode}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true`)
    .then(res => res.data)
      
};

const getStationTimetable = (station_from, station_to, date, time, offset) => {
  return  axios.get(`${api_url}/train/station/${station_from}/${date}/${time}/timetable.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&to_offset=PT${offset}:00&calling_at=${station_to}`)
    .then(res => res.data);
  //    .then(userData => res.status(200).send(userData))
  // return 'Hello'

       
};

const getLiveRoute = (from, to) => {
  return  axios.get(`${api_url}/train/station/${from}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true&to_offset=PT23:59:00&calling_at=${to}`)
    .then(res => res.data);
  //    .then(userData => res.status(200).send(userData))
  // return 'Hello'

       
};

const getTrainServiceLive = (train_uid, date) => {
  return axios.get(`${api_url}/train/service/train_uid:${train_uid}/${date}//timetable.json?app_id=${api_id}&app_key=${api_key}&live=true`);

};

const getStationData = (station_name) => {
  return axios.get(`${api_url}/places.json?query=${station_name}&type=train_station&app_id=${api_id}&app_key=${api_key}`)
    .then(res => res.data);
};

const getLiveStation = (station_code) => {
  return  axios.get(`${api_station}${station_code}/live.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true`)
    .then(res => res.data);
};

module.exports = {getLiveStation, getStationData, getStationTimetable, getLiveRoute, getStationDepartures, getTrainServiceLive};