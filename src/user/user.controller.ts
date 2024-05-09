import { Controller, Post, Put, Get, Delete, HttpCode, Body} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    getUser(): Promise<UserDto.GetUserDto> {
        return this.userService.getUser();
    };

    @Post()
    @HttpCode(201)
    getUser2(@Body() postData: UserDto.AddUserDto): any {

        if (!postData.user_name) {
            console.error("user_name is necessary");
            return {error: "user_name is necessary"};
        };

        if (!postData.account) {
            console.error("account is necessary");
            return {error: "account is necessary"};
        };

        if (!postData.password) {
            console.error("password is necessary");
            return {error: "password is necessary"};
        };

        return this.userService.addUser(postData);
    };

    @Put(":id")
    putUser(): any {
        return "Put";
    };

    @Delete(":id")
    deleteUser(): any {
        return "Delete"
    }

}
