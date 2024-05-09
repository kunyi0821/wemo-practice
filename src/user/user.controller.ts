import { Controller, Post, Put, Get, Delete, HttpCode, Body, UseGuards, Request} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService, ) {}


    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(200)
    getUser(@Request() req): Promise<UserDto.GetUserDto> {
        let data = {
            user_id: req.user.user_id
        }
        return this.userService.getUser(data);
    };

    @Post()
    @HttpCode(201)
    addUser(@Body() postData: UserDto.AddUserDto): Promise<any> {
        return this.userService.addUser(postData);
    };

    // @Put(":id")
    // putUser(): any {
    //     return "Put";
    // };

    // @Delete(":id")
    // deleteUser(): any {
    //     return "Delete"
    // }

}
