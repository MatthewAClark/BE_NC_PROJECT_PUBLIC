const db = require('../config/index.js');

const getAllRoutes = () => {
  
  return db.manyOrNone('SELECT * FROM train_routes')
};

const getRouteByStartStation = (station_id) => db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_stations ON train_stations.station_id=train_routes.finish_station WHERE train_routes.starting_station=$1', [station_id]);

const getStartStationByStartId = (start_id) => db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_stations ON train_stations.station_id=train_routes.finish_station WHERE train_routes.starting_station=$1', [start_id]);

const getStartStation = () => db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_stations ON train_stations.station_id=train_routes.finish_station');

const getRouteByStartFinishId = (start_id, finish_id) => db.oneOrNone('SELECT * FROM train_routes WHERE starting_station=$1 AND finish_station=$2', [start_id, finish_id]);

// const getScheduleByDepTime = (departure_time) => db.manyOrNone(`SELECT * FROM train_schedule WHERE departure_time = $1`, [departure_time])

const postNewRoute = (starting_station, finish_station) => db.one('INSERT INTO train_routes (starting_station, finish_station) VALUES ($1, $2) RETURNING *', [starting_station, finish_station]);

const seedNewRoute = (route_id, starting_station, finish_station) => db.one('INSERT INTO train_routes (route_id, starting_station, finish_station) VALUES ($1, $2, $3) RETURNING *', [route_id, starting_station, finish_station]);

const deleteRouteFromID = (route_id) => {
  /// Find train_IDs associated with route id 
  return db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_schedule ON train_routes.route_id=train_schedule.route_id WHERE train_routes.route_id=$1', [route_id]).then(result => {
    const promises = [];
    result.forEach(elem => {
      promises.push(
        new Promise(function (res) { 
               
          // delete all train_ids from schedule and performance tables
          res(db.query('DELETE FROM performance WHERE train_id = $1',[elem.train_id]).then(() => {
            db.query('DELETE FROM train_schedule WHERE train_id = $1', [elem.train_id]);
          }));
        }
        ) );
           
    });
        
    return Promise.all(promises);
         
       
    // Delete from route table
  }) .then(() => db.query('DELETE FROM train_routes WHERE route_id = $1 RETURNING *', [route_id]));
};



// const postDelay = (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id) => db.one(`INSERT INTO delays (date_of_delay, expected_date_departure,expected_arrival_time, expected_departure_time, cancelled, train_id) VALUES ($1, $2, $3, $4, false, $5) RETURNING *`, [date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, train_id])

// const postCancelled = (date_of_delay, train_id) => db.one(`INSERT INTO delays (date_of_delay, cancelled, train_id) VALUES ($1, true, $2) RETURNING *`, [date_of_delay, train_id])

// const putScheduleArrivalTimeUpdate = (arrival_time, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_time = $1 WHERE train_id = $2 RETURNING *`, [arrival_time, train_id]);

// const putScheduleArrivalStationUpdate = (arrival_station, train_id) => db.oneOrNone(`UPDATE train_schedule SET arrival_station = $1 WHERE train_id = $2 RETURNING *`, [arrival_station, train_id]);

// const putDelayArrivalTimeUpdate = (expected_arrival_time, delay_id) => db.oneOrNone(`UPDATE delays SET expected_arrival_time = $1 WHERE delay_id = $2 RETURNING *`, [expected_arrival_time, delay_id]);

module.exports = {seedNewRoute, deleteRouteFromID, getRouteByStartFinishId, getStartStation, getStartStationByStartId, postNewRoute, getAllRoutes, getRouteByStartStation };