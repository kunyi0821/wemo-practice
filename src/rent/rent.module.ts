import { Module } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";

@Module({
    controllers: [RentController],
    providers: [MysqlService, RentService]
})

export class RentModule{};