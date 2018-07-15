process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

const readjson = require('readjson')
const postSchedule = require('../models/db').postSchedule
const cronSchedule = require('../modules/autofetch').cronSchedule
const fetchSchedulesByHour = require('../modules/autofetch').fetchSchedulesByHour

//const seedData = () => {
const schedules1 = (readjson.sync(`./data/route.seed.dev.json`))
//const schedules2 = (readjson.sync(`./data/route.seed.dev.1.json`))

let promises = []
schedules1.departures.all.forEach(elem => {
  promises.push(new Promise(function(res, rej) {
    res(postSchedule(elem.train_uid, schedules1.station_name, elem.destination_name, elem.aimed_departure_time, elem.aimed_arrival_time, elem.operator_name))

  }))

})

// schedules2.departures.all.forEach(elem => {
//     promises.push(new Promise(function(res, rej) {
//       res(postSchedule(elem.train_uid, schedules2.station_name, elem.destination_name, elem.aimed_departure_time, elem.aimed_arrival_time, elem.operator_name))
  
//     }))
  
//   })
Promise.all(promises)




 // "dev": 
//}

//module.exports = { seedData }