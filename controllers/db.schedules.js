const {deleteSchedule, getSchedulesAndRoutesByTime, getSchedulesByRouteIDAndTime, getSchedulesByRouteID, getScheduleFromToDepTime, postNewSchedule, getAllSchedules, getScheduleById, getScheduleByDepTime } = require('../models/db.schedules');

// const {deleteStatusWithTrainID} = require('../models/db.status')

const cronSchedule = require('../modules/autofetch').cronSchedule;
const cronSetup = require('../modules/autofetch').cronSetup;

function fetchSchedulesByRouteID(req, res, next) {

  if(req.query.departure_time_from) {

    getSchedulesByRouteIDAndTime(req.params.route_id, req.query.departure_time_from, req.query.departure_time_to)
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 404, error: 'Unable to fetch request'}));
  } else {
    getSchedulesByRouteID(req.params.route_id)
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 404, error: 'Unable to fetch request'})); 
  }

        
}

function fetchSchedulesAndRoutesByTime(req, res, next) {

  if(req.query.from && req.query.to) {

    getSchedulesAndRoutesByTime(req.query.from, req.query.to)
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 404, error: 'Unable to fetch request'}));
  } 

        
}

function fetchSchedules(req, res, next) {
 
  if(req.query.departure_time) {
    // Fetches by specific departure time
               
    getScheduleByDepTime(req.query.departure_time)
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 404, error: 'Unable to fetch request'}));
  } else {
    if(req.query.departure_time_from && req.query.departure_time_to) {
      // Fetches a range of departure times 
                       
      getScheduleFromToDepTime(req.query.departure_time_from, req.query.departure_time_to)
        .then(data => res.status(200).send(data))
        .catch(() => next({status: 404, error: 'Unable to fetch request'}));
    } else {
      // Fetches all schedules if no query has been given
      getAllSchedules()
        .then(data => res.status(200).send(data))
        .catch(() => next({status: 404, error: 'Unable to fetch request'}));
    }
  }
}

function fetchScheduleById(req, res, next) {

  getScheduleById(req.params.schedule_id)
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'}));
}

function addNewSchedule(req, res, next) {
  postNewSchedule(req.body.train_uid, req.body.train_departure_origin, req.body.train_arrival_destination, req.body.arrival_time, req.body.departure_time, req.body.train_operator, req.body.route_id)
    .then(newSchedule => {

      // Add new schedule to cron/
      getAllSchedules()
        .then(res => {
          cronSetup(cronSchedule(res));
        });
      return newSchedule;
      //    })
    })
    .then(newSchedule => res.status(201).send(newSchedule))
    .catch(() => next({status: 400, error: 'Unable to post new schedule'}));
}


function fetchAllSchedules(req, res, next) {

               
  getAllSchedules()
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'}));
}

function removeSchedule(req, res, next) {
  deleteSchedule(req.params.schedule_id)
    .then(data => res.status(201).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'}));
}

module.exports = {removeSchedule, fetchSchedulesAndRoutesByTime, fetchSchedulesByRouteID, fetchSchedules, fetchAllSchedules, fetchScheduleById, addNewSchedule };