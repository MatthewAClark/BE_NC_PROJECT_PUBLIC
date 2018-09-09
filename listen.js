/* eslint-disable no-console*/

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const app = require('./server.js');
const PORT = process.env.PORT;


// Turn on the server
//
app.listen(PORT, function (err) {
  if(err) throw(err);
  console.log(`App listening on port ${PORT}`);
});
