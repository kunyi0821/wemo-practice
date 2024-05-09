import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MysqlService } from "src/common/mysql.service";

@Module({
    controllers: [UserController],
    providers: [UserService, MysqlService]
})

export class UserModule{};