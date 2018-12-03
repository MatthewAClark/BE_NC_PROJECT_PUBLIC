const readjson = require('readjson');

const getServiceRoute = () => {
  return new Promise(function (res) {
    res(readjson.sync('./data/service.route.test.json'));


  });
};
const getLiveRoute = (from, to) => {
  return new Promise(function (res) {
    if(from === 'MAN' && to=== 'LPY') {
      res(readjson.sync('./data/test/liveRoute.json'));
    }
      

  });

};

const getTrainServiceLive = (train_uid) => {
 
  return new Promise(function (res) {
    if(train_uid === 'Y23255') {
      res({data: readjson.sync('./data/test/liveService.json')});
    }
    if(train_uid === 'Y12345') {
      res(readjson.sync('./data/live.service.test.1.json'));
    }
     
  
  });
};

const getStationTimetable = (station_from,  station_to, date, time, offset) => {
  return new Promise(function (res) {
    res(readjson.sync('./data/test/stationTimetable.json'));
  })
}

const getStationData = (station_name) => {

    
  return new Promise(function(res) {
    if (station_name === 'Leeds') {
      res( readjson.sync('./data/test/stationData.json'));
    } else throw(`expeceted Leeds but got ${station_name}`);
  });
};

const getLiveStation = (station_code) => {
  return new Promise(function(res) {
    if (station_code === 'EXD') {
      res( readjson.sync('./data/test/liveStation.json'));
    } else throw(`expeceted EXD but got ${station_code}`);
  });
};

  

module.exports = {getStationTimetable, getLiveRoute, getLiveStation, getServiceRoute, getStationData, getTrainServiceLive };