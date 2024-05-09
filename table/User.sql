DROP TABLE If EXISTS `User`;

CREATE TABLE `User` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '會員編號',
  `account` varchar(50) NOT NULL,
  `password` varbinary(255) NOT NULL COMMENT '會員密碼',
  `user_name` varchar(25) NOT NULL COMMENT '會員名稱',
  `email` varchar(50) DEFAULT NULL COMMENT '電子信箱',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '創建時間',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `account` (`account`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4

-- 