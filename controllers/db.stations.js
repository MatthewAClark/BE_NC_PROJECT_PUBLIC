const {getStationByCode, deleteStation, postStation, getAllStations, getStationById} = require('../models/db.stations');

function fetchStationById(req, res, next) {
   
  getStationById(req.params.station_id)
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'})) ;
}

function fetchStation(req, res, next) {
  if(req.query.code) {
    getStationByCode(req.query.code)
      .then(data => {
        if(data) res.status(200).send(data); else next({status: 400, error: 'Cannot find station in database'});})
      .catch(() => next({status: 404, error: 'Unable to fetch request'})) ;
  } else {
    getAllStations()
      .then(data => res.status(200).send(data))
      .catch(() => next({status: 404, error: 'Unable to fetch request'})) ;  
  }
}

function addNewStation(req, res, next) {
  // Check station does not already exist
  getStationByCode(req.body.station_code)
    .then(dbStation => {
      if(!dbStation) {

        // Add station if not
        postStation(req.body.station_name, req.body.station_code, req.body.user_station_type)
          .then(data => res.status(201).send(data))
          .catch(() => next({status: 400, error: 'Unable to add new station'}));
      } else {

        //else send back status
        next({status: 400, error: 'Station already exists'});
      }
    });
   
        
}

function removeStation(req, res, next) {
   
  deleteStation(req.params.station_id)
    .then(data => res.status(201).send(data))
    .catch(() => next({status: 400, error: 'Unable to delete station'}));
}
module.exports = {fetchStation, removeStation, addNewStation,  fetchStationById};