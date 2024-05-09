DROP TABLE If EXISTS `Scooter`;

CREATE TABLE `Scooter` (
    scooter_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "機車編號",
    license_plate varchar(10) NOT NULL COMMENT "車牌號碼",
    is_use tinyint(1) DEFAULT 0 COMMENT "是否使用中 1 = 使用中 0 = 沒使用",
    is_enable tinyint(1) DEFAULT 1 COMMENT "是否可使用 1 = 可使用 0 = 報銷",
    created_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT "創建時間",
    updated_at datetime DEFAULT NULL COMMENT "修改時間",
    PRIMARY KEY (`scooter_id`),
    UNIQUE KEY `uc_license_plate` (`license_plate`),
    KEY `is_use` (`is_use`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4
