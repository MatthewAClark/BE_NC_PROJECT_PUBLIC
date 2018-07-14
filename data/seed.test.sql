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
    VALUES ('C77127', 'Exeter St Davids', 'Glasgow Central', '13:22', '22:32', 'CrossCountry'), 
            ('C42224', 'Exeter St Davids', 'Barnstaple', '13:22', '13:27', 'Great Western Railway'),
            ('C40170','Exeter St Davids', 'Plymouth', '13:26', '13:27', 'Great Western Railway'),
            ('C43226', 'Exeter St Davids', 'Cardiff Central', '13:36', '13:38', 'Great Western Railway'),
            ('C77350','Exeter St Davids', 'Plymouth', '13:43', '13:44', 'CrossCountry'),
            ('C42376','Exeter St Davids', 'Exmouth', '13:48', '13:52', 'Great Western Railway'),
            ('C40023', 'Exeter St Davids', 'London Paddington', '13:54', '13:57', 'Great Western Railway'),
            ('C43171', 'Exeter St Davids', 'Paignton', '13:55', '13:58', 'Great Western Railway'),
            ('V01655', 'Exeter St Davids', 'Penzance', '14:05', '14:09', 'Great Western Railway');

            

INSERT INTO delays (date_of_delay, expected_arrival_time, expected_departure_time, cancelled, train_id)
    VALUES ('2018-07-09', '13:23', '13:24', false, 1),
            ('2018-07-09', '13:41', '13:42', false, 3),
            ('2018-07-09', '13:55', '13:56', false, 5),
            ('2018-07-09', '13:55','13:59', false, 6),
            ('2018-07-09', '13:58', '14:01', false, 7);
            


