# Personalised Railway App Backend API
This app forms the backend of my Northcoders final project. It is used by rail passengers to be able to create a train schedule board for their own personal use. With data provided by an external API, live train times are fectched from the National Rail network. These times are stored to build up a window of schedules over the next few direct services between certain stations as chosen by the user. The train data is easily accessable from the apps home page, so that users do not have to navigate through options if they are in a hurry for a train. Services are stored by the users descretion, which means only services that they are interested in will be displayed, along with the services status.

Train performances for each stored service are also fetched and stored one minute before departure. This over time can then be used to analyse the statistics of trains running on time, delayed or cancellations on certain routes or train operators. 

### Example
A user could use the app for commuting between home and work. They would set up both stations for home and work, then set up the train times in the morning to travel from home to work and again in the evening from work to home. All available services could be stored and displayed at the appropriate times for when the user checks for times.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Transport API

This app uses Transport API for requesting data from the national rail network. 

`https://www.transportapi.com/`

You will need to set up your own account in order to use TransportAPI with this app, and provide your own api id and key for use with this app. 

### Prerequisites

#### Production

* Node JS
* PostSQL 
* Cors
* Bodyparser
* Express (NodeJS Application framework)

#### Development and Testing
* An API client such as Postman
* Supertest
* Chai and Mocha
* Nodem
* Dotenv

## Installing
### SQL

You will need to download and install PostgreSQL, as this is used for maintaining the SQL database. It is available here along with the installation instructions:

```
https://www.postgresql.org/download/
```
#### Github
Using the terminal, clone the repo from GitHub
```
git clone https://github.com/MatthewAClark/BE_NC_PROJECT_PUBLIC
```
### Node Setup
Change into the working directory
```
cd BE_NC_PROJECT_PUBLIC
```
Once there, you can open the project in your integrated development environment (IDE). In Microsoft Visual Studio, the command is
```
code .
```
### .env files
.env files will need to be provided for a local setup. These files should contain the port number for the server of your machine and also the database paths. There are three database paths that are used and these are production, test and development. These files should all be followed with the .env extension as well as a dot

```
.production.env
.test.env
.development.env
```
The file contents as follows (although your port number may be different)
```
PORT=3000
DATABASE_URL=<sql database path>
```
Install the required packages 
```
npm install
```
This should install all required packages for this app as stated in the package.json file

### Tranpsort API Config file
The app needs to know the credentials for connecting to the Transport API database. This is provided in the `api.config.js` stored in the config directory. The file should contain the following code
```
const apiConfig = {
    api_id: <your api id code for Transport API>,
    api_key: <you api key for Transport API>,
    api_url: 'https://transportapi.com/v3/uk/',
    api_station: 'https://transportapi.com/v3/uk/train/station/',
    api_service: 'https://transportapi.com/v3/uk/train/service/',
    api_places: 'https://transportapi.com/v3/uk/places.json'
};

module.exports = apiConfig;
```

#### .env files

.env files will need to be provided for local setup. These files should contain the port number the server will run your localhost and it should also provide the database paths. There are three database paths that are used and these are production, test and development. These files should all be followed with the .env extension as well as start with a dot, as following:

```
.production.env
.test.env
.development.env
```
The files should contain the following:
```
PORT=3000
DATABASE_URL='<name of train database>'
```

To ensure that installation is successful, you can start by running the following NODE environment.

```
npm run dev
```
If this fails with 'unexpected token ...' then you may need to update to or use nvm version 9.7.1
```
nvm use 9.7.1
```
If successful, your terminal should say - 'Listening to port... (specified by your .env file)'

And point your web browser or API client using a GET request to the following URL, should return a JSON object of all the articles in the database.

```
GET localhost:<port>/api/db/stations
```
The API should return an object with a list of stations
```
```

## Running the tests

The test script for this project resides in the /spec directory in the root of this project and is called /main.spec.js. It is executed as follows:

The test suite comprises of the following packages

* Supertest
* Mocha
* Chai
```
npm run test
```
These tests simulate API request for the various database endpoints. Before each test, the database is reseeded in order for consistency with the data used. At the end of every test, the database is disconnected.

Supertest is used to simulate requests being made to the server, with Mocha providing the framework and Chai providing the assertion library. For more information on Supertest, please visit the following website:
```
https://www.npmjs.com/package/supertest
```