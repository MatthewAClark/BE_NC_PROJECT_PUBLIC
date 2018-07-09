DROP DATABASE IF EXISTS train_database_test;
CREATE DATABASE train_database_test;

\c train_database_test;

CREATE TABLE train_schedule (
    train_Id SERIAL PRIMARY KEY,
    train_status VARCHAR(10),
    departure_station VARCHAR(20),
    arrival_station VARCHAR(20),
    departure_time TIME,
    arrival_time TIME,
    train_operator VARCHAR(20)
);


CREATE TABLE delayed_train (
    incident_id SERIAL PRIMARY KEY,
    date_of_delay DATE,
    actual_time_departure TIME,
    expected_arrival_time TIME,
    actual_arrival_time TIME,
    train_id INT,
    FOREIGN KEY (train_Id) REFERENCES train_schedule(train_id) 
);

-- CREATE TABLE incident_location (
--     id SERIAL PRIMARY KEY,
--     location_name VARCHAR(20),
--     delay_time TIME,
--     FOREIGN KEY (incident_id) REFERENCES delayed_train(incident_id)
-- );

INSERT INTO train_schedule (departure_station, arrival_station, departure_time, arrival_time, train_operator)
    VALUES ('Nalmouth', 'Clester', '16:05', '16:43', 'The Train Company'), ('Nalmouth', 'Clester', '16:45', '17:32', 'The Train Company');

INSERT INTO delayed_train (date_of_delay, actual_time_departure, expected_arrival_time, actual_arrival_time, train_id)
    VALUES ('09/07/18', '16:10', '16:48', '17:02', 1)


