DROP DATABASE IF EXISTS train_database;
CREATE DATABASE train_database;

\c train_database_dev;

CREATE TABLE train_stations (
    station_id SERIAL PRIMARY KEY,
    station_name VARCHAR(40),
    station_code VARCHAR(3),
    user_station_type VARCHAR(20)
);

CREATE TABLE train_routes (
    route_id SERIAL PRIMARY KEY,
    starting_station INT,
    finish_station INT,
    FOREIGN KEY (starting_station) REFERENCES train_stations(station_id),
    FOREIGN KEY (finish_station) REFERENCES train_stations(station_id)
);

CREATE TABLE train_schedule (
    train_id SERIAL PRIMARY KEY,
    train_uid VARCHAR(20),
    train_departure_origin VARCHAR(40),
    train_arrival_destination VARCHAR(40),
    arrival_time TIME,
    departure_time TIME,
    train_operator VARCHAR(30),
    route_id INT,
    FOREIGN KEY (route_id) REFERENCES train_routes(route_id)
);


CREATE TABLE performance (
    performance_id SERIAL PRIMARY KEY,
    schedule_date VARCHAR(10),
    expected_date_departure VARCHAR(10),
    expected_arrival_time TIME,
    expected_departure_time TIME,
    train_status VARCHAR(20),
    train_id INT,
    FOREIGN KEY (train_Id) REFERENCES train_schedule(train_id) 
);

