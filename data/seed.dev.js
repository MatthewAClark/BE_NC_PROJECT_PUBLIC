process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

const readjson = require('readjson')
const {postNewSchedule} = require('../models/db.schedules.js')

//const seedData = () => {
const schedules1 = (readjson.sync(`./data/schedules.dev.1.json`))
const schedules2 = (readjson.sync(`./data/schedules.dev.2.json`))

let promises = []
schedules1.departures.all.forEach(elem => {
  promises.push(new Promise(function(res, rej) {
    res(postNewSchedule(elem.train_uid, elem.origin_name, elem.destination_name, elem.aimed_arrival_time, elem.aimed_departure_time, elem.operator_name, 2))

  }))

})

schedules2.departures.all.forEach(elem => {
    promises.push(new Promise(function(res, rej) {
      res(postNewSchedule(elem.train_uid, elem.origin_name, elem.destination_name, elem.aimed_arrival_time, elem.aimed_departure_time, elem.operator_name, 2))
  
    }))
  
  })
Promise.all(promises)




 // "dev": 
//}

//module.exports = { seedData }