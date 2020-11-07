CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `country_code` varchar(5) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_dt` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_dt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- TODO Add column city and land mark
CREATE TABLE `user_address` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `address_line1` varchar(150)  DEFAULT NULL,
  `address_line2` varchar(150) DEFAULT NULL,
  `pincode` int(7) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `user_id` int (11),
  `is_active` int(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_dt` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_dt` int(11) DEFAULT NULL
);


SELECT u.*, ua.* from users u
inner join user_address ua on ua.user_id=u.id
where ua.is_active=1;

