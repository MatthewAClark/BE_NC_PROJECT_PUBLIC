# Personalised Railway App Backend API
This app forms the backend of my Northcoders final project. It is used by rail passengers to be able to create a train schedule board for their own personal use. With data proveded by an external API, live train times are fectched from the National Rail network. These times are stored to build up a window of schedules over the next few direct services between certain stations as chosen by the user. The train data is easily accessable from the apps home page, so that users do not have to navigate through options if they are in a hurry for a train. Services are stored by the users descretion, which means only services that they are interested in will be displayed, along with the services status.

Train performances for each stored service are also fetched and stored one minute before departure. This over time can then be used to analyse the statistics of trains running on time, delayed or cancellations on certain routes or train operators. 

### Example
A user could use the app for commuting between home and work. They would set up both stations for home and work, then set up the train times in the morning to travel from home to work and again in the evening from work to home. All available services could be stored and displayed at the appropriate times for when the user checks for times.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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
### PreSQL

If running this on a Mac, you will need the Postgres app. This can be found here:
#### Linux
Install PostgreSQL
```
sudo apt-get install postgresql postgresql-contrib
```
Create database users
```
sudo -u postgres createuser --superuser $USER
sudo -u postgres createdb $USER
```
Enter psql
```
psql
```
Create login by using your linux username for 'Username'
```
ALTER USER username WITH PASSWORD 'password'
```
Quit psql by
```
\q
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





