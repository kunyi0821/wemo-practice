import { Module } from "@nestjs/common";
import { MysqlService } from "@common/mysql.service";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";
import { RedisService } from "@common/redis.service";
import { ReturnService } from "@common/return.service";

@Module({
    controllers: [RentController],
    providers: [RentService, MysqlService, RedisService, ReturnService]
})

export class RentModule{};