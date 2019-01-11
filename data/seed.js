process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const readjson = require('readjson');

const { seedStation } = require('../models/db.stations.js');
const { seedNewRoute } = require('../models/db.routes.js');
const { seedNewSchedule } = require('../models/db.schedules.js');
const { seedNewStatus } = require('../models/db.status.js');


//const seedData = () => {
const stations = (readjson.sync(`./data/${process.env.NODE_ENV}/stations.json`));
const routes = (readjson.sync(`./data/${process.env.NODE_ENV}/routes.json`));
const schedules = (readjson.sync(`./data/${process.env.NODE_ENV}/schedules.json`));
const status = (readjson.sync(`./data/${process.env.NODE_ENV}/status.json`));

//const delays = (readjson.sync('./data/delay_data/allDelays.json'));


Promise.all(stations.map(elem => {
  return (new Promise(function (res) {
  //const result = 
  
   res(seedStation(elem.station_id, elem.station_name, elem.station_code, null));
   //res(console.log('you should see this afterwards'))
   
  }));
 

})).then(() => {
  Promise.all(routes.map(elem => {
    return (new Promise(function (res) {
      
      res(seedNewRoute(elem.route_id, elem.starting_station, elem.finish_station));
      
    }));
  
  }))
}).then(() => {
  Promise.all(schedules.map(elem => {
    return (new Promise(function (res) {
    
   res(seedNewSchedule(elem.train_id, elem.train_uid, elem.train_departure_origin, elem.train_arrival_destination, elem.arrival_time, elem.departure_time, elem.train_operator, elem.route_id))
     
    }));
  
  }))
}).then(() => {
  Promise.all(status.map(elem => {
    return (new Promise(function (res) {
     // console.log(elem)
      res(seedNewStatus(elem.performance_id, elem.schedule_date, elem.expected_date_departure, elem.expected_arrival_time, elem.expected_departure_time, elem.train_status, elem.train_id))
      
    }));
  
  }))
})



