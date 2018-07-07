
const axios = require('axios')
const api_id = require('../config/api.config').api_id
const api_key = require('../config/api.config').api_key
const api_url = require('../config/api.config').api_url




// GET DATA 



const getLiveStatus = () => {
  return  axios.get(`${api_url}/train/station/TOP/2018-07-09/18:50/timetable.json?app_id=${api_id}&app_key=${api_key}&train_status=passenger&darwin=true`)
  .then(res => res.data)
//    .then(userData => res.status(200).send(userData))
// return 'Hello'

       
}



module.exports = { getLiveStatus }