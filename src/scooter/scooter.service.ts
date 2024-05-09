import { Injectable, HttpStatus } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { ReturnService } from "@common/return.service";

@Injectable()
export class ScooterService {

    constructor(
        private readonly mysqlService: MysqlService,
        private readonly returnService: ReturnService
    ) {};

    async getScooter(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let scooterData = await this.mysqlService.execute(connection, `SELECT * FROM Scooter`);

        for (const scooter of scooterData) {
            returnArray.push({
                scooter_id: scooter.scooter_id,
                license_plate: scooter.license_plate,
                is_use: scooter.is_use ? true : false,
                is_enable: scooter.is_enable ? true : false,
                created_at: scooter.created_at,
                updataed_at: scooter.updataed_at
            })
        }

        return this.returnService.returnJson("Success", HttpStatus.OK, returnArray);;
    }

    async addScooter(data: any): Promise<any> {
        const { license_plate } = data;
        const connection = await this.mysqlService.init();

        const insertSql = `INSERT INTO Scooter (license_plate) VALUES (?)`;
        await this.mysqlService.execute(connection, insertSql, [license_plate]);

        return this.returnService.returnJson("Success", HttpStatus.OK, {});;
    }
}
