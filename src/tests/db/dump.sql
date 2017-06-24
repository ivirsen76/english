# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.14)
# Database: feather
# Generation Time: 2017-06-24 16:31:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table _migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_migrations`;

CREATE TABLE `_migrations` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `_migrations_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `_migrations` WRITE;
/*!40000 ALTER TABLE `_migrations` DISABLE KEYS */;

INSERT INTO `_migrations` (`name`)
VALUES
    ('20170502140022-add-users-table.js'),
    ('20170503033121-add-cards-table.js');

/*!40000 ALTER TABLE `_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cards`;

CREATE TABLE `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `translate` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `ukSoundFile` varchar(255) DEFAULT NULL,
  `ukSoundLength` int(11) DEFAULT NULL,
  `usSoundFile` varchar(255) DEFAULT NULL,
  `usSoundLength` int(11) DEFAULT NULL,
  `ruSoundFile` varchar(255) DEFAULT NULL,
  `ruSoundLength` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `statusUpdatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;

INSERT INTO `cards` (`id`, `userId`, `text`, `translate`, `label`, `ukSoundFile`, `ukSoundLength`, `usSoundFile`, `usSoundLength`, `ruSoundFile`, `ruSoundLength`, `status`, `statusUpdatedAt`, `createdAt`, `updatedAt`)
VALUES
    (18,1,'slow green turtle','медленная зеленая черепаха','','users/1/18_uk_9pmcyG.mp3',1541,'users/1/18_us_QZe6tY.mp3',1097,'users/1/18_ru_SnlZHU.mp3',1880,0,'2017-05-12 19:31:05','2017-05-12 19:31:05','2017-05-14 02:07:47'),
    (19,1,'temporary','временно','','users/1/19_uk_IFS0g5.mp3',757,'users/1/19_us_P4Iqd4.mp3',835,'users/1/19_ru_JykB8v.mp3',679,0,'2017-05-12 19:32:34','2017-05-12 19:32:33','2017-05-12 19:32:34'),
    (20,1,'Ramble','бормотать','test','users/1/20_uk_eIwnhi.mp3',679,'users/1/20_us_Ysfslw.mp3',679,'users/1/20_ru_r9Ccez.mp3',835,0,'2017-05-12 19:33:40','2017-05-12 19:33:40','2017-06-01 21:37:58'),
    (21,1,'One more time together','Еще один раз','test','users/1/21_uk_sKTDFP.mp3',1384,'users/1/21_us_3gJfPY.mp3',1593,'users/1/21_ru_EiPbqg.mp3',1123,0,'2017-05-12 19:34:49','2017-05-12 19:34:49','2017-05-14 01:22:27'),
    (22,1,'Try it now immediately','Попробуй это немедленно','','users/1/22_uk_Fb6wFp.mp3',1515,'users/1/22_us_g4Fv9u.mp3',1358,'users/1/22_ru_hdqwkS.mp3',1410,0,'2017-05-12 19:35:48','2017-05-12 19:35:48','2017-05-14 01:57:19');

/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `updatedAt`)
VALUES
    (1,'ivirsen@gmail.com','$2a$10$Hzeo5ERqYsjZck2VQa7IdOcPpfSTWmmlyaharv23vrE9FGHQjofj2','2017-05-06 02:46:39','2017-05-06 02:46:39');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
