import { Controller, Post, Put, Get, Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser(): any {
        return this.userService.getUser();
    };

    @Post("")
    getUser2(): any {
        return this.userService.getUser2();
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
