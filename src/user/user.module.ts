import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MysqlService } from "src/common/mysql.service";
import { AuthService } from "src/auth/auth.service";
import { ReturnService } from "@common/return.service";

@Module({
    controllers: [UserController],
    providers: [UserService, MysqlService, AuthService, ReturnService]
})

export class UserModule{};