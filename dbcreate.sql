CREATE DATABASE airbnb;

USE airbnb;

CREATE TABLE users (
id_user integer auto_increment,
email varchar(120) not null,
password varchar(100) not null,
first_name varchar(70),
last_name varchar(70),
role varchar(20) not null,
PRIMARY KEY (id_user)
);

CREATE TABLE cities (
id_city integer auto_increment,
name_city varchar(100),
PRIMARY KEY (id_city)
);

CREATE TABLE places (
id_place integer auto_increment,
user_id integer not null,
city_id integer not null,
name_place varchar(100),
description varchar(2000),
rooms integer,
bathrooms integer,
max_guests integer,
price_by_night decimal(6,2) not null,
available boolean,
PRIMARY KEY (id_place),
FOREIGN KEY (user_id) references users(id_user),
FOREIGN KEY (city_id) references cities(id_city)
);

CREATE TABLE bookings (
id_booking integer auto_increment,
place_id integer not null,
user_id integer not null,
check_in date not null,
check_out date not null,
PRIMARY KEY (id_booking),
FOREIGN KEY (user_id) references users(id_user),
FOREIGN KEY (place_id) references places(id_place)
);

INSERT INTO cities values
(1, "Naples"), 
(2, "New-York");

INSERT INTO users values
(1, "james@gmail.com", "hello21", "james", "carter", "host"), 
(2, "jess@gmail.com", "paris21", "jessica", "vall", "host");
(3, "july@gmail.com", "sun21", "july", "fret", "tourist");

INSERT INTO places VALUES
(1, 1, 1, "my lovely house", "beautiful house in beautiful italian city", 3, 1, 7, 75, true), 
(2, 1, 1, "little flat", "little appartement perfect for couple", 1, 1, 2, 35, true);