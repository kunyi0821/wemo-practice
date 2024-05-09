import { Injectable } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { RentDto } from "./rent.dto";
import * as dayjs from "dayjs";

@Injectable()
export class RentService {

    constructor(private readonly mysqlService: MysqlService) {};

    async getRent(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let rentData = await this.mysqlService.execute(connection, `SELECT * FROM Rent`);

        return rentData;
    }

    async startRent(data: RentDto.RentStartDto): Promise<any> {
        const { user_id, scooter_id } = data;
        const currentDatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");

        const connection = await this.mysqlService.init();
        await connection.beginTransaction();
        
        const selectRentSql = `SELECT rent_id FROM Rent WHERE user_id = ? AND use_time = 0 AND end_at IS NULL`;
        const rentResult = await this.mysqlService.execute(connection, selectRentSql, [user_id]);

        if (rentResult.length > 0) {
            console.error("User has rented scooter");
            await connection.rollback();
            return {error: "User has rented scooter"};
        }

        const updateScooterSql = `UPDATE Scooter SET is_use = 1 WHERE scooter_id = ? AND is_use = 0`;
        const updateScooterResult = await this.mysqlService.execute(connection, updateScooterSql, [scooter_id])

        if (updateScooterResult.affectedRows === 0) {
            console.error("This scooter is being used")
            await connection.rollback();
            return {error: "This scooter is being used"}
        }

        const insertSql = `INSERT INTO Rent (user_id, scooter_id, created_date, start_at) VALUES (?, ?, ?, ?)`;
        await this.mysqlService.execute(connection, insertSql, [user_id, scooter_id, currentDatetime, currentDatetime]);

        await connection.commit();

        return true;
    }

    async endRent(data: RentDto.RentStartDto): Promise<any> {
        const { user_id, scooter_id } = data;
        const currentDatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");

        const connection = await this.mysqlService.init();
        await connection.beginTransaction();

        const selectRentSql = `SELECT * FROM Rent WHERE user_id = ? AND scooter_id = ? AND use_time = 0 AND end_at IS NULL`;
        const rentResult = await this.mysqlService.execute(connection, selectRentSql, [user_id, scooter_id]);

        console.log("rentResult", rentResult)
        if (rentResult.length === 0) {
            console.error("User did not rent");
            await connection.rollback();
            return {error: "User did not rent"};
        }

        if (rentResult.length > 1) {
            console.error("User is limited to rent 1 scooter");
            await connection.rollback();
            return {error: "User is limited to rent 1 scooter"};
        }

        const updateScooterSql = `UPDATE Scooter SET is_use = 0 WHERE scooter_id = ?`;
        const updateScooterResult = await this.mysqlService.execute(connection, updateScooterSql, [scooter_id]);

        const useTime = dayjs(currentDatetime).diff(rentResult[0].start_at, "second");

        const updateRentSql = `UPDATE Rent SET end_at = ?, use_time = ? WHERE rent_id = ? AND user_id = ? AND scooter_id = ?`;
        const updateRentResult = await this.mysqlService.execute(connection, updateRentSql, [currentDatetime, useTime, rentResult[0].rent_id, user_id, scooter_id])


        await connection.commit();

        return true;
    }

}