DROP TABLE If EXISTS `Rent`;

CREATE TABLE `Rent` (
      `rent_id` int NOT NULL AUTO_INCREMENT COMMENT '租賃編號',
  `user_id` int NOT NULL COMMENT '會員編號',
  `scooter_id` int NOT NULL COMMENT '會員名稱',
  `created_date` date DEFAULT NULL COMMENT '創建日期',
  `start_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '開始時間',
  `end_at` datetime DEFAULT NULL COMMENT '結束時間',
  `use_time` int DEFAULT '0' COMMENT '使用時間',
  PRIMARY KEY (`rent_id`),
  KEY `idx_user_scooter_id` (`user_id`,`scooter_id`),
  CONSTRAINT `fk_scooter_id` FOREIGN KEY (`scooter_id`) REFERENCES `Scooter`(`scooter_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4

-- 可使用diagram去紀錄資料庫更動