const {deleteRouteFromID, getRouteByStartFinishId, getStartStation, getStartStationByStartId, postNewRoute, getAllRoutes, getRouteByStartStation } = require('../models/db.routes');

function fetchRouteByStartStation(req, res, next) {


  getRouteByStartStation(req.params.station_id)
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'})); 


}

function fetchStartStationByStartId(req, res, next) {
  getStartStationByStartId(req.params.start_id)
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'})); 


}

function fetchStartStation(res, next) {
  getStartStation()
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'})); 


}

function addNewRoute(req, res, next) {
  // Check route does not already exist
  getRouteByStartFinishId(req.body.starting_station, req.body.finish_station)
    .then(result => {
      if (!result) {
        // if not then create
        postNewRoute(req.body.starting_station, req.body.finish_station)
          .then(data => res.status(201).send(data));
      } else {
        res.status(200);
      }
    })
    .catch(() => next({status: 400, error: 'Unable to add new route'})) ;


}

function removeRouteFromId(req, res, next) {
  deleteRouteFromID(req.params.route_id)
    .then(data => res.status(201).send(data))
    .catch(() => next({status: 404, error: 'Unable to fetch request'})) ;
}



function fetchAllRoutes(req, res, next) {
  getAllRoutes()
  .then(data => res.status(200).send(data))
  .catch(() => next({status: 404, error: 'Unable to fetch request'}));
 
        
}


module.exports = {removeRouteFromId, fetchStartStation, fetchStartStationByStartId, addNewRoute, fetchAllRoutes, fetchRouteByStartStation };