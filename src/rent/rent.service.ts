import { Injectable, HttpStatus } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { RedisService } from "@common/redis.service";
import { ReturnService } from "@common/return.service";
import { RentDto } from "./rent.dto";
import * as dayjs from "dayjs";

@Injectable()
export class RentService {

    constructor(
        private readonly mysqlService: MysqlService,
        private readonly redisService: RedisService,
        private readonly returnService: ReturnService
    ) {};

    async getRent(data: any): Promise<any> {
        const { user_id } = data;
        const connection = await this.mysqlService.init();

        let rentData = await this.mysqlService.execute(connection, `SELECT * FROM Rent WHERE user_id = ?`, [user_id]);

        return this.returnService.returnJson("Success", HttpStatus.OK, rentData);
    }

    async startRent(data: RentDto.RentStartDto): Promise<any> {
        const { user_id, scooter_id } = data;
        const currentDatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");

        // await this.redisService.hdel(user_id, "rent");

        const connection = await this.mysqlService.init();
        await connection.beginTransaction();
        
        const rentInfo = await this.redisService.hget(user_id, "rent");

        if (rentInfo) {
            console.error("User has rented scooter");
            await connection.rollback();
            return this.returnService.returnJson("User has rented scooter", HttpStatus.INTERNAL_SERVER_ERROR, {});
        }

        const updateScooterSql = `UPDATE Scooter SET is_use = 1 WHERE scooter_id = ? AND is_use = 0`;
        const updateScooterResult = await this.mysqlService.execute(connection, updateScooterSql, [scooter_id])

        if (updateScooterResult.affectedRows === 0) {
            console.error("This scooter is being used")
            await connection.rollback();
            return this.returnService.returnJson("This scooter is being used", HttpStatus.INTERNAL_SERVER_ERROR, {});
        }

        const insertSql = `INSERT INTO Rent (user_id, scooter_id, created_date, start_at) VALUES (?, ?, ?, ?)`;
        const insertResult = await this.mysqlService.execute(connection, insertSql, [user_id, scooter_id, currentDatetime, currentDatetime]);

        const value = `${insertResult.insertId}_${currentDatetime}`
        await this.redisService.hset(user_id, "rent", value);

        await connection.commit();

        return this.returnService.returnJson("Success", HttpStatus.OK, {});;
    }

    async endRent(data: RentDto.RentStartDto): Promise<any> {
        const { user_id, scooter_id } = data;
        const currentDatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");

        const connection = await this.mysqlService.init();
        await connection.beginTransaction();

        const rentValue = await this.redisService.hget(user_id, "rent");

        const selectRentSql = `SELECT * FROM Rent WHERE user_id = ? AND scooter_id = ? AND use_time = 0 AND end_at IS NULL`;
        const rentResult = await this.mysqlService.execute(connection, selectRentSql, [user_id, scooter_id]);

        if (!rentValue) {
            console.error("User did not rent");
            await connection.rollback();
            return this.returnService.returnJson("User did not rent", HttpStatus.INTERNAL_SERVER_ERROR, {});
        }

        const rentInfo = (rentValue as string).split("_");

        const updateScooterSql = `UPDATE Scooter SET is_use = 0 WHERE scooter_id = ?`;
        const updateScooterResult = await this.mysqlService.execute(connection, updateScooterSql, [scooter_id]);

        const useTime = dayjs(currentDatetime).diff(rentInfo[1], "second");

        const updateRentSql = `UPDATE Rent SET end_at = ?, use_time = ? WHERE rent_id = ? AND user_id = ? AND scooter_id = ?`;
        const updateRentResult = await this.mysqlService.execute(connection, updateRentSql, [currentDatetime, useTime, rentInfo[0], user_id, scooter_id])

        if (updateRentResult.affectedRows === 0) {
                console.error("User returns the wrong scooter");
            await connection.rollback();
            return this.returnService.returnJson("User returns the wrong scooter", HttpStatus.INTERNAL_SERVER_ERROR, {});
        }
        await this.redisService.hdel(user_id, "rent");

        await connection.commit();

        return this.returnService.returnJson("Success", HttpStatus.OK, {});
    }

}