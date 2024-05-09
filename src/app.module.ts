import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ScooterModule } from "./scooter/scooter.module";
import { RentModule } from "./rent/rent.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [UserModule, ScooterModule, RentModule, AuthModule]
})

export class AppModule {};
