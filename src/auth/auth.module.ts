import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { MysqlService } from 'src/common/mysql.service';
import { jwtConstant } from './auth.constant';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
        global: true,
        secret: jwtConstant.secret,
        signOptions: { expiresIn: "30d" },
        }),
    ],
    providers: [AuthService, UserService, MysqlService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}