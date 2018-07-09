DROP DATABASE IF EXISTS train_database_dev;
CREATE DATABASE train_database_dev;

\c train_database_dev;

CREATE TABLE train_schedule (
    Id SERIAL PRIMARY KEY,
    train_uid VARCHAR(20),
    departure_station VARCHAR(30),
    arrival_station VARCHAR(30),
    arrival_time TIME,
    departure_time TIME,
    train_operator VARCHAR(30),
    timetable URL(100)
);


CREATE TABLE delayed_train (
    incident_id SERIAL PRIMARY KEY,
    date_of_delay VARCHAR(10),
    expected_arrival_time TIME,
    expected_departure_time TIME,
    train_id INT,
    FOREIGN KEY (train_Id) REFERENCES train_schedule(id) 
);

-- CREATE TABLE incident_location (
--     id SERIAL PRIMARY KEY,
--     location_name VARCHAR(20),
--     delay_time TIME,
--     FOREIGN KEY (incident_id) REFERENCES delayed_train(incident_id)
-- );
