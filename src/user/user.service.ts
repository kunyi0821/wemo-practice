import { ReturnService } from "@common/return.service";
import { Injectable, HttpStatus } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";

@Injectable()
export class UserService {

    constructor(
        private readonly mysqlService: MysqlService,
        private readonly returnService: ReturnService
    ) {};

    async getUser(data: any): Promise<any> {
        const { user_id } = data
        let returnArray = [];

        const connection = await this.mysqlService.init();

        const selectSql = `SELECT * FROM User WHERE user_id = ?`

        let userData = await this.mysqlService.execute(connection, selectSql, [user_id]);

        for (const user of userData) {
            returnArray.push({
                user_id: user.user_id,
                account: user.account,
                email: user.email
            })
        }

        return this.returnService.returnJson("Success", HttpStatus.OK, returnArray);;
    }

    async addUser(data: any): Promise<any> {

        const { account, password, user_name } = data;
        const connection = await this.mysqlService.init();

        const insertSql = `INSERT INTO User (account, password, user_name) VALUES (?, ?, ?)`;
        const insertResult = await this.mysqlService.execute(connection, insertSql, [account, password, user_name]);

        return this.returnService.returnJson("Success", HttpStatus.OK, {});
    }
    
    async findOne(account: string): Promise<any> {

        const selectSql = `SELECT * FROM User WHERE account = ?`;
        const connection = await this.mysqlService.init();
        
        const userResult = await this.mysqlService.execute(connection, selectSql, [account]);
        
        return userResult.find(user => user.account === account);
    }
}
