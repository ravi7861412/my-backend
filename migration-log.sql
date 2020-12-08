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

ALTER TABLE user_address
ADD landmark varchar(150);


CREATE TABLE `mapping` (
id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id int(11),
wallet_id int(11)
);

INSERT INTO mapping(user_id,wallet_id)
VALUES(1,3);

CREATE TABLE  `wallet`(
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `deposit` int(11) DEFAULT 0, 
  `bonus` int(11) DEFAULT 0,
  `winning` int(11) DEFAULT 0,
  `fanFight_wallet` int(11) DEFAULT 0,
  `is_active` int(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_dt` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_dt` int(11) DEFAULT NULL
);
INSERT INTO wallet(bonus,deposit,winning,fanFight_wallet)
VALUES(60,100,340,500);

UPDATE wallet SET bonus=60,deposit=100,winning=340,fanFight_wallet=500
WHERE id=1;
UPDATE wallet SET bonus=2000,deposit=1000,winning=1000,fanFight_wallet=4000
WHERE id=1;

SELECT * from walletinner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=?