import { Injectable } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";

@Injectable()
export class UserService {

    constructor(private readonly mysqlService: MysqlService) {};

    async getUser(): Promise<any> {
        let returnArray = [];

        const connection = await this.mysqlService.init();

        let userData = await this.mysqlService.execute(connection, `SELECT * FROM User`);

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
        console.log("addUser")
        const { account, password, user_name } = data;
        const connection = await this.mysqlService.init();

        const insertSql = `INSERT INTO User (account, password, user_name) VALUES (?, ?, ?)`;
        const insertResult = await this.mysqlService.execute(connection, insertSql, [account, password, user_name]);

        return true;
    }
    
    async findOne(account: string): Promise<any> {

        const selectSql = `SELECT * FROM User WHERE account = ?`;
        const connection = await this.mysqlService.init();
        
        const userResult = await this.mysqlService.execute(connection, selectSql, [account]);
        console.log("userResult", userResult)
        
        return userResult.find(user => user.account === account);
    }
}
