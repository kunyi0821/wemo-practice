import { Injectable } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";

@Injectable()
export class UserService {

    constructor(private readonly mysqlService: MysqlService) {

    };

    async getUser(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let userData = await this.mysqlService.execute(connection, `SELECT * FROM User`);
        console.log("userData = ",userData)

        for (const user of userData) {
            returnArray.push({
                user_id: user.user_id,
                account: user.account,
                email: user.email
            })
        }

        return returnArray;
    }

    async addUser(data: any): Promise<any> {
        const { account, password, email, user_name } = data;
        const connection = await this.mysqlService.init();

        const insertSql = `INSERT INTO User (account, password, email, user_name) VALUES (?, ?, ?, ?)`;
        await this.mysqlService.execute(connection, insertSql, [account, password, email, user_name]);

        return
    }
}
