import { Module } from "@nestjs/common";
import { MysqlService } from "src/common/mysql.service";
import { ScooterController } from "./scooter.controller";
import { ScooterService } from "./scooter.service";
@Module({
    controllers: [ScooterController],
    providers: [ScooterService, MysqlService]
})

export class ScooterModule{};