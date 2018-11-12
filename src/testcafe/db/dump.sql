# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.39)
# Database: feather
# Generation Time: 2018-11-10 02:37:53 +0000
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
    ('20170503033121-add-cards-table.js'),
    ('20170701065301-add-write-fields.js'),
    ('20170924155242-add-bases-table.js'),
    ('20170924164013-add-basecards-table.js'),
    ('20181107181837-add-words-column-for-bases-table.js'),
    ('20181107189999-change-words-column-for-bases-table.js');

/*!40000 ALTER TABLE `_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table basecards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `basecards`;

CREATE TABLE `basecards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baseId` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `translate` varchar(255) NOT NULL,
  `ukSoundFile` varchar(255) DEFAULT NULL,
  `ukSoundLength` int(11) DEFAULT NULL,
  `usSoundFile` varchar(255) DEFAULT NULL,
  `usSoundLength` int(11) DEFAULT NULL,
  `ruSoundFile` varchar(255) DEFAULT NULL,
  `ruSoundLength` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `baseId` (`baseId`),
  CONSTRAINT `basecards_ibfk_1` FOREIGN KEY (`baseId`) REFERENCES `bases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `basecards` WRITE;
/*!40000 ALTER TABLE `basecards` DISABLE KEYS */;

INSERT INTO `basecards` (`id`, `baseId`, `text`, `translate`, `ukSoundFile`, `ukSoundLength`, `usSoundFile`, `usSoundLength`, `ruSoundFile`, `ruSoundLength`, `createdAt`, `updatedAt`)
VALUES
    (1,2,'block','блок','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-06-12 06:17:46','2018-06-12 06:17:46'),
    (2,2,'second','второй','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:05','2018-09-30 22:50:05'),
    (3,2,'third','третий','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:14','2018-09-30 22:50:14'),
    (4,2,'fourth','четвертый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:21','2018-09-30 22:50:21'),
    (5,2,'fifth','пятый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:27','2018-09-30 22:50:27'),
    (6,2,'s`ix\'th','ш\'ест`ой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:34','2018-09-30 22:50:34'),
    (7,2,'sevens-teen','седьмой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:46','2018-09-30 22:50:46'),
    (8,2,'eight','восьмой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:05','2018-09-30 22:51:05'),
    (9,2,'ninth pen','девятый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:11','2018-09-30 22:51:11'),
    (10,2,'calendar (another)','календарь','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:18','2018-09-30 22:51:18'),
    (11,3,'both','оба','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:18','2018-09-30 22:51:18');

/*!40000 ALTER TABLE `basecards` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bases
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bases`;

CREATE TABLE `bases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `info` tinytext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'folder',
  `isMain` tinyint(1) NOT NULL DEFAULT '0',
  `arrangeChildren` varchar(255) NOT NULL DEFAULT 'list',
  `label` varchar(255) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `words` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `bases` WRITE;
/*!40000 ALTER TABLE `bases` DISABLE KEYS */;

INSERT INTO `bases` (`id`, `parentId`, `position`, `title`, `info`, `image`, `type`, `isMain`, `arrangeChildren`, `label`, `count`, `price`, `createdAt`, `updatedAt`, `words`)
VALUES
    (1,4,0,'English File','',NULL,'folder',0,'table','',0,0,'2018-06-12 06:17:13','2018-09-30 00:29:19',''),
    (2,13,0,'Who\'s who?','',NULL,'cards',0,'list','',10,0,'2018-06-12 06:17:26','2018-09-30 00:30:35',''),
    (3,13,1,'Who knows you better?','',NULL,'cards',0,'list','',0,0,'2018-06-13 06:17:26','2018-09-30 00:30:35',''),
    (4,0,0,'Учебники','',NULL,'folder',0,'list','',0,0,'2018-06-10 06:17:13','2018-06-10 06:17:13',''),
    (5,13,2,'At the Mouline Rouge','',NULL,'cards',0,'list','',0,0,'2018-09-29 03:02:00','2018-09-30 00:30:35',''),
    (6,13,3,'The Devil\'s Dictionary','',NULL,'cards',0,'list','',0,0,'2018-09-29 03:02:00','2018-09-30 00:30:35',''),
    (12,1,1,'Pre-intermediate','Год: 1998\nISBN: 324-454354-45645645','samples/english_file_pre_intermediate.jpg','folder',1,'table','',10,0,'2018-09-30 00:25:20','2018-09-30 00:35:46',''),
    (13,12,0,'Chapter 1','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20',''),
    (14,12,1,'Chapter 2','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20',''),
    (15,12,2,'Chapter 3','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20',''),
    (16,12,3,'Chapter 4','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20',''),
    (17,14,0,'Right place, wrong time','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45',''),
    (18,14,1,'A moment in time','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45',''),
    (19,14,2,'Fifty years of pop','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45',''),
    (20,14,3,'One October evening','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45',''),
    (21,15,0,'Where are you going?','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10',''),
    (22,15,1,'The pessimist\'s phrase book','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10',''),
    (23,15,2,'I\'ll always love you','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10',''),
    (24,15,3,'I was only dreaming','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10',''),
    (25,16,0,'From rags to riches','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40',''),
    (26,16,1,'Family conflicts','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40',''),
    (27,16,2,'Faster, faster!','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40',''),
    (28,16,3,'The world\'s friendliest city','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40',''),
    (29,1,0,'Elementary','','samples/english_file_elementary.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46',''),
    (30,1,2,'Intermediate','','samples/english_file_intermediate.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46',''),
    (31,1,3,'Upper-intermediate','','samples/english_file_upper_intermediate.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46',''),
    (32,1,4,'Advanced','','samples/english_file_advanced.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46',''),
    (33,12,4,'Chapter 5','',NULL,'folder',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43',''),
    (34,33,0,'Are you a party animal?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43',''),
    (35,33,1,'What makes you feel good?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43',''),
    (36,33,2,'How much can you learn in a month?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43',''),
    (37,33,3,'The name of the game','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43',''),
    (38,12,5,'Chapter 6','',NULL,'folder',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08',''),
    (39,38,0,'If something bad can happen, it will','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08',''),
    (40,38,1,'Never smile at a crocodile','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08',''),
    (41,38,2,'Decisions, decisions','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08',''),
    (42,38,3,'What should I do?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');

/*!40000 ALTER TABLE `bases` ENABLE KEYS */;
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
  `writeRightAttempts` int(11) NOT NULL DEFAULT '0',
  `writeLastDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;

INSERT INTO `cards` (`id`, `userId`, `text`, `translate`, `label`, `ukSoundFile`, `ukSoundLength`, `usSoundFile`, `usSoundLength`, `ruSoundFile`, `ruSoundLength`, `status`, `statusUpdatedAt`, `createdAt`, `updatedAt`, `writeRightAttempts`, `writeLastDate`)
VALUES
    (18,2,'text','т`екст','alone','samples/sample.mp3',600,'samples/sample.mp3',653,'samples/sample.mp3',600,0,'2017-05-12 19:31:05','2017-05-12 19:31:05','2017-07-05 15:26:50',0,NULL),
    (19,2,'block','блок','','samples/sample.mp3',548,'samples/sample.mp3',574,'samples/sample.mp3',600,0,'2017-05-12 19:32:34','2017-05-12 19:32:33','2017-06-24 18:54:24',0,NULL),
    (20,2,'Ramble','бормотать','test','samples/sample.mp3',679,'samples/sample.mp3',679,'samples/sample.mp3',835,0,'2017-05-12 19:33:40','2017-05-12 19:33:40','2017-06-01 21:37:58',0,NULL),
    (21,2,'One more time together','Еще один раз','test','samples/sample.mp3',1384,'samples/sample.mp3',1593,'samples/sample.mp3',1123,0,'2017-05-12 19:34:49','2017-05-12 19:34:49','2017-05-14 01:22:27',0,NULL),
    (22,2,'Try it now immediately','Попробуй это немедленно','','samples/sample.mp3',1515,'samples/sample.mp3',1358,'samples/sample.mp3',1410,0,'2017-05-12 19:35:48','2017-05-12 19:35:48','2017-05-14 01:57:19',0,NULL),
    (23,2,'p`erson (some)','челов`ек','','samples/sample.mp3',783,'samples/sample.mp3',626,'samples/sample.mp3',757,1,'2017-06-25 10:43:28','2017-06-25 10:42:51','2017-06-25 10:43:28',2,NULL),
    (24,2,'car','машина','','samples/sample.mp3',496,'samples/sample.mp3',522,'samples/sample.mp3',653,1,'2017-06-25 10:43:29','2017-06-25 10:42:59','2017-06-25 10:43:29',2,NULL),
    (25,2,'calendar','календарь','','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,1,'2017-06-25 10:43:30','2017-06-25 10:43:06','2017-06-25 10:43:30',0,NULL),
    (26,1,'calendar (some)','календарь','','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,1,'2017-06-25 10:43:30','2017-06-25 10:43:06','2017-06-25 10:43:30',0,NULL);

/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `roles`, `createdAt`, `updatedAt`)
VALUES
    (1,'admin@gmail.com','$2a$10$Hzeo5ERqYsjZck2VQa7IdOcPpfSTWmmlyaharv23vrE9FGHQjofj2','admin','2017-05-06 02:46:39','2017-05-06 02:46:39'),
    (2,'student@gmail.com','$2a$10$Hzeo5ERqYsjZck2VQa7IdOcPpfSTWmmlyaharv23vrE9FGHQjofj2','student','2017-05-06 02:46:39','2017-05-06 02:46:39');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
