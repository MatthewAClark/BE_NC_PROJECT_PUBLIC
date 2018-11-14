
const {getLiveStation, getStationData, getStationTimetable, getLiveRoute, getStationDepartures, getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`);


function fetchStationDepartures(req, res, next) {
  getStationDepartures(req.params.station_name)
    .then(departures => res.status(200).send(departures))
    .catch((err) => next({status: 400, error: 'Unable to fetch request'}));

}

function fetchStationTimetable(req, res, next) {
  
  getStationTimetable(req.query.station_from,  req.query.station_to, req.query.date, req.query.time, req.query.offset)
    
    .then(data => res.status(200).send(data))
    .catch(() => next({status: 400, error: 'Unable to fetch request'}));
}

function fetchTrainService(req, next) {

  getTrainServiceLive(req.params.id, req.query.date)
    .then(res => {

      res.status(200).send(res.data);
    })
    .catch(() => next({status: 400, error: 'Unable to fetch request'}));

}

function fetchStationData(req, res, next) {

  getStationData(req.params.station_name)
    
    .then(station => {
      res.status(200).send(station);
    })
    .catch((err) => next({status: 400, error: 'Unable to fetch request'}));
}

function fetchLiveRoute(req, res, next) {
  getLiveRoute(req.query.from, req.query.to)
    .then(live => res.status(200).send(live))
    .catch(() => next({status: 400, error: 'Unable to fetch request'}));
}

function fetchLiveStation(req, res, next) {
  getLiveStation(req.params.station_code)
    .then(live => res.status(200).send(live))
    .catch(() => next({status: 400, error: 'Unable to fetch request'}));
}


module.exports = { fetchLiveStation, fetchStationData, fetchStationTimetable, fetchLiveRoute, fetchStationDepartures, fetchTrainService };