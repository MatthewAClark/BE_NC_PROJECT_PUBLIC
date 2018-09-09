const {deleteStatusWithTrainID, getStatusById, getStatusWithSchedules, getStatusByTrainId, getAllStatus, postNewStatus } = require('../models/db.status');

function fetchAllStatus(req, res, next) {

  if(req.query.train_id) {
    getStatusByTrainId(req.query.train_id)
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 400, error: 'Unable to fetch request'}));
  } else {
    getAllStatus()        
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 400, error: 'Unable to fetch request'})); 
  }

        
}

function fetchStatusWithSchedules(res, next) {

      
  getStatusWithSchedules()        
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 400, error: 'Unable to fetch request'})); 
     
}


function fetchStatusById(req, res, next) {
  getStatusById(req.params.status_id)
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 400, error: 'Unable to fetch request'}));
}

function addNewStatus(req, res, next) {
  postNewStatus(req.body.schedule_date, req.body.expected_date_departure, req.body.expected_arrival_time, req.body.expected_departure_time, req.body.train_status, req.body.train_id)
    .then(data => res.status(201).send(data))
    .catch(() => next({status: 400, error: 'Unable to post new status'}));
}

function removeStatus(req, res, next) {

  deleteStatusWithTrainID(req.query.train_id)
    .then(data => res.status(201).send(data))
    .catch(() => next({status: 400, error: 'Unable to delete status'}));
}



module.exports = { removeStatus, fetchStatusWithSchedules, fetchAllStatus, fetchStatusById, addNewStatus };