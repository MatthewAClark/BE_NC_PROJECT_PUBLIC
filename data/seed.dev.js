process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const readjson = require('readjson')
const { postNewSchedule } = require('../models/db.schedules.js')
const { postNewDelay } = require('../models/db.delays.js')

//const seedData = () => {
const schedules1 = (readjson.sync(`./data/schedules.dev.1.json`))
const schedules2 = (readjson.sync(`./data/schedules.dev.2.json`))
const delays = (readjson.sync(`./data/delay_data/allDelays.json`))

let Promises = []
schedules1.departures.all.forEach(elem => {
  Promises.push(new Promise(function (res, rej) {
    res(postNewSchedule(elem.train_uid, elem.origin_name, elem.destination_name, elem.aimed_arrival_time, elem.aimed_departure_time, elem.operator_name, 2))
    console.log('scheds1', elem)
  }))

})

schedules2.departures.all.forEach(elem => {
  Promises.push(new Promise(function (res, rej) {
    res(postNewSchedule(elem.train_uid, elem.origin_name, elem.destination_name, elem.aimed_arrival_time, elem.aimed_departure_time, elem.operator_name, 1))
//console.log('scheds2', elem)
  }))

})
Promise.all(Promises)
//   .then(() => {
//     Promises2 = []
// console.log(delays)
//     delays.forEach(elem => {
//       Promises2.push(new Promise(function (res, rej) {
//         // console.log(elem)
//         res(postNewDelay(elem.date_of_delay, elem.expected_date_departure, elem.expected_arrival_time, elem.expected_departure_time, elem.cancelled, elem.train_id))
//       }))
//     })
//     console.log('delays')
//     postNewDelay('2018-09-07', '2018-09-07', '16:05','16:07', 'false', 1)
//     Promise.all(Promises2)
//   })





 // "dev": 
//}

//module.exports = { seedData }