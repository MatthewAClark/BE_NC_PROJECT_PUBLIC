/* eslint-disable no-console*/

const { getLiveStation } = require(`../models/departures.${process.env.NODE_ENV}`); // For fetching from live API
const { postStatus } = require('../models/db.js'); // 
const { getSchedulesWithStationByTime } = require('../models/db.js');

// import cron schedular
const cron = require('node-cron');
const tasks = [];

// Setup cron schedules
const cronSetup = (schedular) => {
  schedular.forEach((task, i) => {

    // Kill off any schedular tasks already running
    if (tasks[i]) {
      tasks[i].stop();
      tasks[i].destroy();
    } else {tasks.push('');} // create a new one
    tasks[i] = cron.schedule(task, function () {
      const dateTime = getCurrentDateTime();
      console.log(`running new fetch at: ${dateTime.time}`);
      fetchStatusAndStore(dateTime.time)
        .then(res => console.log(res));
    }, false);

    // start each schedular task
    tasks[i].start();
  });
};

// Create schedular tasks for each hour of the day when train schedules run

const cronSchedule = (schedules) => {

  const hourArr = [];
  const minuteArr = [];

  // Take the minutes and hours of each departing schedule
  schedules.forEach(schedule => {
    let minutes = Number(schedule.departure_time.slice(3,5));
    let hours = Number(schedule.departure_time.slice(0, 2));
console.log(getCurrentDateTime())
    // Allow hour offset for BST with Heroku
    // console.log(process.env.NODE_ENV)
    // if(process.env.NODE_ENV === 'production') {
    //   console.log('offset hour')
    //   if (hours === 23 ) hours = 00; else hours--
    // }
  
    // Subtract one minute off the departing time so that we don't miss the train on a fetch
    if (minutes === 0) {
      minutes = 59;
      if (hours === 0) {
        hours = 23;
      } else {
        hours = hours - 1;
      }
    } else {
      minutes = minutes - 1;
    }


    // Order into hours and minutes array   
    if (hourArr.indexOf(hours) === -1) {
      hourArr.push(hours);
      minuteArr.push([minutes]);
    } else {
      if ( minuteArr[hourArr.indexOf(hours)].indexOf(minutes) === -1) {
        minuteArr[hourArr.indexOf(hours)].push(minutes);
      }
    }

    // sort out the minutes in order
    minuteArr.forEach(minute => minute.sort((a, b) => a - b));


    // console.log(`${hours}:${minutes}`)
  });
 
  // Create an array with the correct node-cron syntax
  const schedular = [];
  hourArr.forEach((elem, i) => {
    schedular.push(`${minuteArr[i]} ${elem} * * *`);
  });

  return schedular;
   
};



// // Return the current time of day
const getCurrentDateTime = () => {
  const currDate = new Date();

  let minutes = Number(currDate.getMinutes());
  let hours = Number(currDate.getHours());

  if (minutes === 59) {
    minutes = 0;
    if (hours === 23) {
      hours = 0;
    } else {
      hours++;
    }
  } else {
    minutes++;
  }

  if (minutes < 10) minutes = '0' + minutes;
  if (hours < 10) hours = '0' + hours;

  return {
    date: `${currDate.getFullYear()}-${(currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1)}-${currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate()}`,
    time: `${hours}:${minutes}:00`,
    day: currDate.getDay()
  };
};

const fetchStatusAndStore = (dep_time) => {

  // Fetch all times from db that depart at given time
  return getSchedulesWithStationByTime(dep_time)
    .then(schedules => {
      console.log(schedules)

      // Fetch live from the API
      return fetchLiveStationsFromSchedules(schedules)
        .then(schedules => {
        //  console.log(schedules)
          // Add to Database
          return addStatusToDB(schedules)
            .then(result => result);

        }); 
    });
  
};

const fetchLiveStationsFromSchedules = (schedules) => {

  // Ensure we do only one fetch per station
  // Fetch station code from schedules and store them in an array
  const stations = [];
  const promises = [];

  schedules.forEach(schedule => {
    if (stations.indexOf(schedule.station_code) === -1) {
      stations.push(schedule.station_code);
    }
  });

  // Go through each station
  stations.forEach(station => {
    promises.push(new Promise(function (res) {
      getLiveStation(station)
        .then(status => {
          // remove all unwanted departures
          status.departures.all = status.departures.all.filter(elem => {

            return (schedules.map(uid => uid.train_uid).indexOf(elem.train_uid) !== -1);
          });

          // Add train_id to result
          if (status.departures.all.length > 0) {
            status.departures.all.map(elem => {
              elem.train_id = schedules[(schedules.map(uid => uid.train_uid).indexOf(elem.train_uid))].train_id;
              return elem;
            });
          }
          // depsOfInterest
          res(status);
        });

    }));
  });
  return Promise.all(promises);
};

const addStatusToDB = (allStatus) => {
  const promises = [];

  // Add all array data to database
  allStatus.forEach(station => {
    station.departures.all.forEach(schedule => {
      promises.push(new Promise(function (res) {
        res(postStatus(station.date, station.date, schedule.expected_arrival_time, schedule.expected_departure_time, schedule.status, schedule.train_id));

      }));
    });
  });
  return Promise.all(promises);
};

module.exports = { getCurrentDateTime, addStatusToDB, fetchLiveStationsFromSchedules, fetchStatusAndStore, cronSetup, cronSchedule };