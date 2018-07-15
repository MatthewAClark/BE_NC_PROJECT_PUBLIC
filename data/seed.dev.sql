DROP DATABASE IF EXISTS train_database_dev;
CREATE DATABASE train_database_dev;

\c train_database_dev;

CREATE TABLE train_schedule (
    train_id SERIAL PRIMARY KEY,
    train_uid VARCHAR(20),
    departure_station VARCHAR(40),
    arrival_station VARCHAR(40),
    departure_time TIME,
    arrival_time TIME,
    train_operator VARCHAR(40)
);


CREATE TABLE delays (
    delay_id SERIAL PRIMARY KEY,
    date_of_delay VARCHAR(10),
    expected_date_departure VARCHAR(10),
    expected_arrival_time TIME,
    expected_departure_time TIME,
    cancelled BOOLEAN NOT NULL,
    train_id INT,
    FOREIGN KEY (train_Id) REFERENCES train_schedule(train_id) 
);

-- CREATE TABLE incident_location (
--     id SERIAL PRIMARY KEY,
--     location_name VARCHAR(20),
--     delay_time TIME,
--     FOREIGN KEY (incident_id) REFERENCES delayed_train(incident_id)
-- );
