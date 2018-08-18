const readjson = require('readjson')

const getStationData = (stationCode) => {
  return new Promise(function (res, rej) {

    res(readjson.sync(`./data/station.departures.test.json`))
  }) //(stationCode) => {}}
}


const getServiceRoute = (origin, destination) => {
  return new Promise(function (res, rej) {
console.log('we are here')
    res(readjson.sync(`./data/service.route.test.json`))


  })
}

const getTrainServiceLive = (train_uid, date) => {
 
    return new Promise(function (res, rej) {
      if(train_uid === 'Y23259') {
      res({ data: readjson.sync(`./data/live.service.test.json`)})
      }
      if(train_uid === 'Y12345') {
        res({ data: readjson.sync(`./data/live.service.test.1.json`)})
        }
     
  
    })
  }

  const getLiveStation = (station_code) => {
    return new Promise(function(res, rej) {
      if (station_code === 'EXD') {
        res({ data: readjson.sync(`./data/test/liveStation.json`)})
      } else throw(`expeceted EXD but got ${station_code}`)
    })
  }

  

  module.exports = { getLiveStation, getServiceRoute, getStationData, getTrainServiceLive }