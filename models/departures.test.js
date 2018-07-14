const readjson = require('readjson')

const getStationDepartures = (stationCode) => {
  return new Promise(function (res, rej) {

    res(readjson.sync(`./data/station.departures.test.json`))
  }) //(stationCode) => {}}
}


const getServiceRoute = (origin, destination) => {
  return new Promise(function (res, rej) {

    res(readjson.sync(`./data/service.route.test.json`))


  })
}

const getTrainServiceLive = (train_uid, date) => {
 
    return new Promise(function (res, rej) {
      if(train_uid !== 'Y23259' || date !=='2018-07-16') rej({ 'train_uid': train_uid, 'date': date})
      res({ data: readjson.sync(`./data/live.service.test.json`)})
     
  
    })
  }

  

  module.exports = { getServiceRoute, getStationDepartures, getTrainServiceLive }