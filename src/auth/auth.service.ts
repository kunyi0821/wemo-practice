import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt";
import { ReturnService } from '@common/return.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly returnService: ReturnService
    ) {}

    async signIn(user_name: string, password: string,): Promise<any> {
        const user = await this.userService.findOne(user_name);

        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { user_id: user.user_id, user_name: user.user_name };
        const accessToken = await this.jwtService.signAsync(payload);

        return this.returnService.returnJson("Success", HttpStatus.OK, {access_token: accessToken});

    }
}