DROP DATABASE IF EXISTS train_database_test;
CREATE DATABASE train_database_test;

\c train_database_test;

CREATE TABLE train_schedule (
    train_id SERIAL PRIMARY KEY,
    train_uid VARCHAR(20),
    departure_station VARCHAR(30),
    arrival_station VARCHAR(30),
    departure_time TIME,
    arrival_time TIME,
    train_operator VARCHAR(30)
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

INSERT INTO train_schedule (train_uid, departure_station, arrival_station, arrival_time, departure_time, train_operator)
    VALUES ('Y12345', 'Manchester Piccadilly', 'Manchester Airport', '22:06', '22:07', 'Northern Rail'), 
    ('Y23259', 'Manchester Piccadilly', 'Liverpool South Parkway', '22:06', '22:07', 'Northern Rail'),
            ('Y23240', 'Manchester Piccadilly', 'Liverpool South Parkway', '08:12', '08:14', 'Northern Rail'),
            ('Y23252','Manchester Piccadilly', 'Liverpool South Parkway', '11:07', '11:11', 'Northern Rail'),
            ('Y23256', 'Manchester Piccadilly', 'Liverpool South Parkway', '11:37', '11:38', 'East Midlands Trains'),
            ('C67109','Manchester Piccadilly', 'Liverpool South Parkway', '12:09', '12:11', 'Northern Rail'),
            ('Y23260','Manchester Piccadilly', 'Liverpool South Parkway', '12:37', '12:38', 'East Midlands Trains'),
            ('Y23260', 'Manchester Piccadilly', 'Liverpool South Parkway', '13:08', '13:09', 'Northern Rail');

            

INSERT INTO delays (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, cancelled, train_id)
    VALUES ('2018-07-16', '2018-07-16', '22:16', '22:17', false, 1),
            ('2018-07-16', '2018-07-16', '12:41', '12:42', false, 6);
            
            


