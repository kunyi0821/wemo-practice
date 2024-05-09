開啟服務前確認 /src/config/.env 是否有檔案

如果沒有請新增 .env 檔案在 /src/config 路徑底下

並將docker-compose.yml 內的檔案mysql設定檔案貼上

```
MYSQL_HOST=localhost
MYSQL_USER=app_user
MYSQL_PASSWORD=app_password
MYSQL_DATABASE=my_database
PASSWORD_SECRET_KEY=wemo
REDIS_HOST=localhost
REDIS_PASSWORD=app_password
```

下指令 

```
$ docker-compose up 
```

之後 執行 src/table 中的三張table sql指令

分別為 User, Scooter 和 Rent

# wemo-practice
