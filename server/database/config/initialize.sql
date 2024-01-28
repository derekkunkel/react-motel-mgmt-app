CREATE TABLE IF NOT EXISTS `guest` (
  `guest_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `birthday` DATE NOT NULL,
  `license_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`guest_id`)
);

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `wage` float(53) NOT NULL,
  `email` varchar(255),
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `reservation` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `guest_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `price` float(53) NOT NULL,
  `start_date` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  `end_date` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  PRIMARY KEY (`reservation_id`)
);

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `beds` int(11) NOT NULL,
  `price` float(53) NOT NULL,
  `type_id` int(11) NOT NULL,
  `max_guest` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `roomtype` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `smoking` BOOLEAN NOT NULL,
  `kitchenette` BOOLEAN NOT NULL,
  PRIMARY KEY (`type_id`)
);

CREATE TABLE IF NOT EXISTS `schedule` (
  `sched_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `start` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  `end` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  PRIMARY KEY (`sched_id`)
);

CREATE TABLE IF NOT EXISTS `revenue` (
  `revenue_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  `income` float(53) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`revenue_id`)
);

CREATE TABLE IF NOT EXISTS `expenses` (
  `expense_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  `expense` float(53) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`expense_id`)
);



-- Initial values on first startup
INSERT INTO `guest` (first_name, last_name, address, number, birthday, license_number, email) 
VALUES ('Ralph', 'Gregorio', '21 Something St.', '3062031231','2000-04-29', '12345', 'test@yahoo.com');

INSERT INTO `guest` (first_name, last_name, address, number, birthday, license_number, email) 
VALUES ('Rowan', 'Atkinson', '200 Downey St.', '639812311','1955-01-06', '98213', 'mrbean@bbc.uk');

INSERT INTO `employees` (first_name, last_name, wage, email, permission) 
VALUES ('Eyad', 'Ismail ', 22.50, 'esi272@usask.ca','manager');

INSERT INTO `employees` (first_name, last_name, wage, email, permission) 
VALUES ('Timothy', 'Baylon ', 12.50, 'tjb667@usask.ca','employee');

INSERT INTO `employees` (first_name, last_name, wage, email, permission) 
VALUES ('Derek', 'Kunkel ', 12.50, 'ddk960@usask.ca','employee');

INSERT INTO `employees` (first_name, last_name, wage, email, permission) 
VALUES ('Giovanni', 'Bacchetto ', 12.50, 'gab210@usask.ca','employee');

INSERT INTO `roomtype` (type, smoking, kitchenette) 
VALUES ("Deluxe King", 1, 1);

INSERT INTO `roomtype` (type, smoking, kitchenette) 
VALUES ("Standard Queen", 0, 0);

INSERT INTO `rooms` (beds, price, type_id, max_guest) 
VALUES (1, 420.69, 1, 2);

INSERT INTO `rooms` (beds, price, type_id, max_guest) 
VALUES (2, 99.99, 2, 4);

INSERT INTO `schedule` (id, start, end) 
VALUES (1, '2022-02-24 7:00:00', '2022-02-24 18:00:00');

INSERT INTO `schedule` (id, start, end) 
VALUES (2, '2022-02-25 7:00:00', '2022-02-25 18:00:00');

INSERT INTO `revenue` (date, income, name, category) 
VALUES ('2022-02-06', 234.92, 'DeluxeKingReservation', 'hotel revenues');

INSERT INTO `expenses` (date, expense, name, category) 
VALUES ('2022-02-07', 1023.85, 'Queen Matress', 'inventory');

INSERT INTO `reservation` (guest_id, room_id, price, start_date, end_date) 
VALUES (1, 1, 20, '2022-02-24 00:00:01', '2022-02-27 12:00:00');