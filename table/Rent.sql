DROP TABLE If EXISTS `Rent`;

CREATE TABLE `Rent` (
    rent_id int(11) AUTO_INCREMENT PRIMARY KEY COMMENT "租賃編號",
    user_id int(11) NOT NULL COMMENT "會員編號",
    scooter_id int(11) NOT NULL COMMENT "會員名稱",
    created_date date DEFAULT CURRENT_DATE COMMENT "創建日期",
    start_at datetime DEFAULT CURRENT_TIMESTAMP COMMENT "開始時間",
    end_at datetime DEFAULT NULL COMMENT "結束時間",
    use_time int(11) DEFAULT 0 COMMENT "使用時間"
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4

-- 可使用diagram去紀錄資料庫更動