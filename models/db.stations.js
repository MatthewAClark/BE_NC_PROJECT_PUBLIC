
const db = require('../config/index.js');

const getAllStations = () => db.manyOrNone('SELECT * FROM train_stations');

const getStationById = (station_id) => db.oneOrNone('SELECT * FROM train_stations WHERE station_id = $1', [station_id]);

const getStationByCode = (station_code) => db.oneOrNone('SELECT * FROM train_stations WHERE station_code = $1', [station_code]);

const postStation = (station_name, station_code, user_station_type) => db.one('INSERT INTO train_stations (station_name, station_code, user_station_type) VALUES ($1, $2, $3) RETURNING *', [station_name, station_code, user_station_type]);

const seedStation = (station_id, station_name, station_code, user_station_type) => db.one('INSERT INTO train_stations (station_id, station_name, station_code, user_station_type) VALUES ($1, $2, $3, $4) RETURNING *', [station_id, station_name, station_code, user_station_type]);

const deleteStation = (station_id) => {
  return db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_schedule ON train_routes.route_id=train_schedule.route_id WHERE train_routes.starting_station=$1', [station_id]).then(result => {
    const promises = [];
    result.forEach(elem => {
      promises.push(
        new Promise(function (res) {

          res(db.query('DELETE FROM performance WHERE train_id = $1', [elem.train_id]).then(() => {
            db.query('DELETE FROM train_schedule WHERE train_id = $1', [elem.train_id]);
          }));
        }
        ));

    });

    return Promise.all(promises);
  })
    .then(() => db.query('DELETE FROM train_routes WHERE starting_station = $1', [station_id]))
    .then(() => {

      db.manyOrNone('SELECT * FROM train_routes INNER JOIN train_schedule ON train_routes.route_id=train_schedule.route_id WHERE train_routes.finish_station=$1', [station_id]).then(result => {
        const promises = [];
        result.forEach(elem => {
          promises.push(
            new Promise(function (res) {

              res(db.query('DELETE FROM performance WHERE train_id = $1', [elem.train_id]).then(() => {
                db.query('DELETE FROM train_schedule WHERE train_id = $1', [elem.train_id]);
              }));
            }
            ));

        });

        return Promise.all(promises);
      }).then(() => db.query('DELETE FROM train_routes WHERE finish_station = $1', [station_id]));
    })
        
    .then(() => db.query('DELETE FROM train_stations WHERE station_id = $1 RETURNING *', [station_id]));
};

module.exports = { seedStation, getStationByCode, deleteStation, postStation, getAllStations, getStationById};