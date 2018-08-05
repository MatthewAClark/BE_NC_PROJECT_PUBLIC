DROP DATABASE IF EXISTS train_database_test;
CREATE DATABASE train_database_test;

\c train_database_test;


CREATE TABLE train_stations (
    station_id SERIAL PRIMARY KEY,
    station_name VARCHAR(40),
    station_code VARCHAR(3),
    user_station_type VARCHAR(20)
);



CREATE TABLE train_schedule (
    train_id SERIAL PRIMARY KEY,
    train_uid VARCHAR(20),
    train_departure_origin VARCHAR(30),
    train_arrival_destination VARCHAR(30),
    arrival_time TIME,
    departure_time TIME,
    train_operator VARCHAR(30),
    user_starting_station INT,
    user_finish_station INT,
    FOREIGN KEY (user_starting_station) REFERENCES train_stations(station_id),
    FOREIGN KEY (user_finish_station) REFERENCES train_stations(station_id)
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

INSERT INTO train_stations (station_name, station_code, user_station_type)
    VALUES ('Liverpool South Parkway', 'LPY', 'home'),
        ('Manchester Piccadilly', 'MAN', 'work');

INSERT INTO train_schedule (train_uid, train_departure_origin, train_arrival_destination, arrival_time, departure_time, train_operator, user_starting_station, user_finish_station)
    VALUES ('Y23257', 'Manchester Airport', 'Liverpool South Parkway', '12:08', '12:09', 'Northern Rail', 2, 1), 
    ('Y23261', 'Manchester Airport', 'Liverpool South Parkway', '13:07', '13:09', 'Northern Rail', 2, 1),
            ('C67117', 'Norwich', 'Liverpool South Parkway', '14:37', '14:38', 'East Midlands Trains', 2, 1),
            ('C66956','Liverpool South Parkway', 'Norwich', null, '12:03', 'East Midlands Trains', 1, 2),
            ('Y23326', 'Liverpool South Parkway', 'Manchester Airport', null, '12:20', 'East Midlands Trains', 1, 2),
            ('Y23330','Liverpool South Parkway', 'Manchester Airport', null, '13:20', 'Northern Rail', 1, 2);
           

            

INSERT INTO delays (date_of_delay, expected_date_departure, expected_arrival_time, expected_departure_time, cancelled, train_id)
    VALUES ('2018-07-16', '2018-07-16', '13:26', '13:29', false, 2),
            ('2018-07-16', '2018-07-16', '14:41', '14:42', false, 3),
            ('2018-07-16', '2018-07-16', null, null, true, 6);
            
            


