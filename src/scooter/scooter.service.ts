import { Injectable } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";

@Injectable()
export class ScooterService {

    constructor(private readonly mysqlService: MysqlService) {};

    async getScooter(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let scooterData = await this.mysqlService.execute(connection, `SELECT * FROM Scooter`);

        console.log("scooterData = ",scooterData)

        for (const scooter of scooterData) {
            returnArray.push({
                scooter_id: scooter.scooter_id,
                license_plate: scooter.license_plate,
                is_use: scooter.is_use,
                is_enable: scooter.is_enable,
                created_at: scooter.created_at,
                updataed_at: scooter.updataed_at
            })
        }

        return returnArray;
    }

    async addScooter(data: any): Promise<any> {
        const { account, password, email, user_name } = data;
        const connection = await this.mysqlService.init();

        const insertSql = `INSERT INTO Scooter (license_plate) VALUES (?)`;
        await this.mysqlService.execute(connection, insertSql, [account, password, email, user_name]);

        return
    }
}
