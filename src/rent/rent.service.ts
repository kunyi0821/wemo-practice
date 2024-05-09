import { Injectable } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import * as dayjs from "dayjs";

@Injectable()
export class RentService {

    constructor(private readonly mysqlService: MysqlService) {};

    async getRent(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let rentData = await this.mysqlService.execute(connection, `SELECT * FROM Rent`);
        
        console.log("rentData = ",rentData)

        for (const rent of rentData) {
            returnArray.push({})
        }

        return returnArray;
    }

    async startRent(data: any): Promise<any> {
        const { account, password, email, user_name } = data;
        const connection = await this.mysqlService.init();
        await connection.beginTransaction();
        
        const updateScooterSql = `UPDATE Scooter SET is_use = 0 WHERE scooter_id = ?`;


        const insertSql = `INSERT INTO Rent (license_plate) VALUES (?)`;
        await this.mysqlService.execute(connection, insertSql, [account, password, email, user_name]);

        return
    }

    async endRent(data: any): Promise<any> {

        const connection = await this.mysqlService.init();
        await connection.beginTransaction();

        const updateScooterSql = `UPDATE Scooter SET is_use = 1 WHERE scooter_id = ?`;

        const updateRentSql = `UPDATE Rent SET end_at = ? WHERE scooter_id = ? `

    }

}