process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

// require the needed modules

const cronSchedule = require('./modules/autofetch').cronSchedule
const fetchSchedulesByHour = require('./modules/autofetch').fetchSchedulesByHour



const app = require('express')();
//const url = require('./config')
const cors = require('cors')






// Define routes
const apiRoutes = require('./routes/apiRoutes.js')

// corse
app.use(cors());

// parse JSON
const{json} = require('body-parser');
app.use(json());

//API routes/
app.use('/api', apiRoutes)

// Server status
app.get('/', (req, res) => {
    res.status(200).send('Server working')
})
//


// fetchSchedulesByHour()
// .then(res => cronSchedule(res))

app.use((err, req, res, next) => {
   console.log(err)
  })

//   fetchSchedulesByHour()
//   .then(res => {
//       cronSchedule(res)
//   })


  module.exports = app 
