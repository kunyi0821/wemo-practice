import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(user_name: string, password: string,): Promise<{ access_token: string }> {
        const user = await this.userService.findOne(user_name);
        // if (user?.password !== password) {
        //     throw new UnauthorizedException();
        // }
        const payload = { user_id: user.user_id, user_name: user.user_name };
        const accessToken = await this.jwtService.signAsync(payload);
        return { access_token: accessToken };
    }
}