import { Controller, Post, Put, Get, Delete, HttpCode, Body} from "@nestjs/common";
import { RentService } from "./rent.service";
import { RentDto } from "./rent.dto";

@Controller("rent")
export class RentController {
    constructor(private readonly scooterService: any) {}

    @Get()
    @HttpCode(200)
    getUser(): Promise<any> {
        return this.scooterService.getScooter();
    };

    @Post()
    @HttpCode(201)
    getUser2(@Body() postData: any): any {

       return
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
