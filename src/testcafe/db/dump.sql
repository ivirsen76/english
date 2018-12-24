
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



DROP TABLE IF EXISTS `_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_migrations` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `_migrations_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `_migrations` WRITE;
/*!40000 ALTER TABLE `_migrations` DISABLE KEYS */;
INSERT INTO `_migrations` VALUES ('20170502140022-add-users-table.js');
INSERT INTO `_migrations` VALUES ('20170503033121-add-cards-table.js');
INSERT INTO `_migrations` VALUES ('20170701065301-add-write-fields.js');
INSERT INTO `_migrations` VALUES ('20170924155242-add-bases-table.js');
INSERT INTO `_migrations` VALUES ('20170924164013-add-basecards-table.js');
INSERT INTO `_migrations` VALUES ('20181107181837-add-words-column-for-bases-table.js');
INSERT INTO `_migrations` VALUES ('20181107189999-change-words-column-for-bases-table.js');
INSERT INTO `_migrations` VALUES ('20181117043023-add-parent-id-index-for-bases-table.js');
/*!40000 ALTER TABLE `_migrations` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `basecards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `basecards` WRITE;
/*!40000 ALTER TABLE `basecards` DISABLE KEYS */;
INSERT INTO `basecards` VALUES (1,2,'block','блок','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-06-12 06:17:46','2018-06-12 06:17:46');
INSERT INTO `basecards` VALUES (2,2,'second','второй','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:05','2018-09-30 22:50:05');
INSERT INTO `basecards` VALUES (3,2,'third','третий','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:14','2018-09-30 22:50:14');
INSERT INTO `basecards` VALUES (4,2,'fourth','четвертый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:21','2018-09-30 22:50:21');
INSERT INTO `basecards` VALUES (5,2,'fifth','пятый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:27','2018-09-30 22:50:27');
INSERT INTO `basecards` VALUES (6,2,'s`ix\'th','ш\'ест`ой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:34','2018-09-30 22:50:34');
INSERT INTO `basecards` VALUES (7,2,'sevens-teen','седьмой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:50:46','2018-09-30 22:50:46');
INSERT INTO `basecards` VALUES (8,2,'Eight.','восьмой','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:05','2018-09-30 22:51:05');
INSERT INTO `basecards` VALUES (9,2,'ninth pen','девятый','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:11','2018-09-30 22:51:11');
INSERT INTO `basecards` VALUES (10,2,'calendar (another).','календарь','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:18','2018-09-30 22:51:18');
INSERT INTO `basecards` VALUES (11,3,'both','оба','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,'2018-09-30 22:51:18','2018-09-30 22:51:18');
/*!40000 ALTER TABLE `basecards` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `bases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  PRIMARY KEY (`id`),
  KEY `bases_parent_id` (`parentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `bases` WRITE;
/*!40000 ALTER TABLE `bases` DISABLE KEYS */;
INSERT INTO `bases` VALUES (1,4,0,'English File','',NULL,'folder',0,'table','',11,0,'2018-06-12 06:17:13','2018-09-30 00:29:19','');
INSERT INTO `bases` VALUES (2,13,0,'Who\'s who?','',NULL,'cards',0,'list','chapter1',10,0,'2018-06-12 06:17:26','2018-09-30 00:30:35','');
INSERT INTO `bases` VALUES (3,13,1,'Who knows you better?','',NULL,'cards',0,'list','',1,0,'2018-06-13 06:17:26','2018-09-30 00:30:35','');
INSERT INTO `bases` VALUES (4,0,0,'Учебники','',NULL,'folder',0,'list','',11,0,'2018-06-10 06:17:13','2018-06-10 06:17:13','');
INSERT INTO `bases` VALUES (5,13,2,'At the Mouline Rouge','',NULL,'cards',0,'list','',0,0,'2018-09-29 03:02:00','2018-09-30 00:30:35','');
INSERT INTO `bases` VALUES (6,13,3,'The Devil\'s Dictionary','',NULL,'cards',0,'list','',0,0,'2018-09-29 03:02:00','2018-09-30 00:30:35','');
INSERT INTO `bases` VALUES (12,1,1,'Pre-intermediate','Год: 1998\nISBN: 324-454354-45645645','samples/english_file_pre_intermediate.jpg','folder',1,'table','',11,0,'2018-09-30 00:25:20','2018-09-30 00:35:46','');
INSERT INTO `bases` VALUES (13,12,0,'Chapter 1','',NULL,'folder',0,'list','',11,0,'2018-09-30 00:25:20','2018-09-30 00:25:20','');
INSERT INTO `bases` VALUES (14,12,1,'Chapter 2','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20','');
INSERT INTO `bases` VALUES (15,12,2,'Chapter 3','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20','');
INSERT INTO `bases` VALUES (16,12,3,'Chapter 4','',NULL,'folder',0,'list','',0,0,'2018-09-30 00:25:20','2018-09-30 00:25:20','');
INSERT INTO `bases` VALUES (17,14,0,'Right place, wrong time','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45','');
INSERT INTO `bases` VALUES (18,14,1,'A moment in time','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45','');
INSERT INTO `bases` VALUES (19,14,2,'Fifty years of pop','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45','');
INSERT INTO `bases` VALUES (20,14,3,'One October evening','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:31:45','2018-09-30 00:31:45','');
INSERT INTO `bases` VALUES (21,15,0,'Where are you going?','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10','');
INSERT INTO `bases` VALUES (22,15,1,'The pessimist\'s phrase book','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10','');
INSERT INTO `bases` VALUES (23,15,2,'I\'ll always love you','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10','');
INSERT INTO `bases` VALUES (24,15,3,'I was only dreaming','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:33:10','2018-09-30 00:33:10','');
INSERT INTO `bases` VALUES (25,16,0,'From rags to riches','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40','');
INSERT INTO `bases` VALUES (26,16,1,'Family conflicts','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40','');
INSERT INTO `bases` VALUES (27,16,2,'Faster, faster!','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40','');
INSERT INTO `bases` VALUES (28,16,3,'The world\'s friendliest city','',NULL,'cards',0,'list','',0,0,'2018-09-30 00:34:40','2018-09-30 00:34:40','');
INSERT INTO `bases` VALUES (29,1,0,'Elementary','','samples/english_file_elementary.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46','');
INSERT INTO `bases` VALUES (30,1,2,'Intermediate','','samples/english_file_intermediate.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46','');
INSERT INTO `bases` VALUES (31,1,3,'Upper-intermediate','','samples/english_file_upper_intermediate.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46','');
INSERT INTO `bases` VALUES (32,1,4,'Advanced','','samples/english_file_advanced.jpg','folder',1,'list','',0,0,'2018-09-30 00:35:46','2018-09-30 00:35:46','');
INSERT INTO `bases` VALUES (33,12,4,'Chapter 5','',NULL,'folder',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43','');
INSERT INTO `bases` VALUES (34,33,0,'Are you a party animal?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43','');
INSERT INTO `bases` VALUES (35,33,1,'What makes you feel good?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43','');
INSERT INTO `bases` VALUES (36,33,2,'How much can you learn in a month?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43','');
INSERT INTO `bases` VALUES (37,33,3,'The name of the game','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:32:43','2018-09-30 22:32:43','');
INSERT INTO `bases` VALUES (38,12,5,'Chapter 6','',NULL,'folder',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');
INSERT INTO `bases` VALUES (39,38,0,'If something bad can happen, it will','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');
INSERT INTO `bases` VALUES (40,38,1,'Never smile at a crocodile','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');
INSERT INTO `bases` VALUES (41,38,2,'Decisions, decisions','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');
INSERT INTO `bases` VALUES (42,38,3,'What should I do?','',NULL,'cards',0,'list','',0,0,'2018-09-30 22:37:08','2018-09-30 22:37:08','');
/*!40000 ALTER TABLE `bases` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (18,2,'text','т`екст','alone','samples/sample.mp3',600,'samples/sample.mp3',653,'samples/sample.mp3',600,0,'2017-05-12 19:31:05','2017-05-12 19:31:05','2017-07-05 15:26:50',0,NULL);
INSERT INTO `cards` VALUES (19,2,'block','блок','','samples/sample.mp3',548,'samples/sample.mp3',574,'samples/sample.mp3',600,0,'2017-05-12 19:32:34','2017-05-12 19:32:33','2017-06-24 18:54:24',0,NULL);
INSERT INTO `cards` VALUES (20,2,'eight','восемь','test','samples/sample.mp3',679,'samples/sample.mp3',679,'samples/sample.mp3',835,0,'2017-05-12 19:33:40','2017-05-12 19:33:40','2017-06-01 21:37:58',0,NULL);
INSERT INTO `cards` VALUES (21,2,'One more time together','Еще один раз','test','samples/sample.mp3',1384,'samples/sample.mp3',1593,'samples/sample.mp3',1123,0,'2017-05-12 19:34:49','2017-05-12 19:34:49','2017-05-14 01:22:27',0,NULL);
INSERT INTO `cards` VALUES (22,2,'Try it now immediately','Попробуй это немедленно','','samples/sample.mp3',1515,'samples/sample.mp3',1358,'samples/sample.mp3',1410,0,'2017-05-12 19:35:48','2017-05-12 19:35:48','2017-05-14 01:57:19',0,NULL);
INSERT INTO `cards` VALUES (23,2,'p`erson (some)','челов`ек','','samples/sample.mp3',783,'samples/sample.mp3',626,'samples/sample.mp3',757,1,'2017-06-25 10:43:28','2017-06-25 10:42:51','2017-06-25 10:43:28',2,NULL);
INSERT INTO `cards` VALUES (24,2,'car','машина','','samples/sample.mp3',496,'samples/sample.mp3',522,'samples/sample.mp3',653,1,'2017-06-25 10:43:29','2017-06-25 10:42:59','2017-06-25 10:43:29',2,NULL);
INSERT INTO `cards` VALUES (25,2,'calendar','календарь','','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,1,'2017-06-25 10:43:30','2017-06-25 10:43:06','2017-06-25 10:43:30',0,NULL);
INSERT INTO `cards` VALUES (26,1,'calendar (some)','календарь','','samples/sample.mp3',626,'samples/sample.mp3',679,'samples/sample.mp3',679,1,'2017-06-25 10:43:30','2017-06-25 10:43:06','2017-06-25 10:43:30',0,NULL);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2a$10$Hzeo5ERqYsjZck2VQa7IdOcPpfSTWmmlyaharv23vrE9FGHQjofj2','admin','2017-05-06 02:46:39','2017-05-06 02:46:39');
INSERT INTO `users` VALUES (2,'student@gmail.com','$2a$10$Hzeo5ERqYsjZck2VQa7IdOcPpfSTWmmlyaharv23vrE9FGHQjofj2','student','2017-05-06 02:46:39','2017-05-06 02:46:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

