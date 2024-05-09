import { Module } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";

@Module({
    controllers: [],
    providers: [MysqlService]
})

export class RentModule{};