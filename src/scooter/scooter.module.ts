import { Module } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { ScooterController } from "./scooter.controller";
import { ScooterService } from "./scooter.service";
import { ReturnService } from "@common/return.service";
@Module({
    controllers: [ScooterController],
    providers: [ScooterService, MysqlService, ReturnService]
})

export class ScooterModule{};