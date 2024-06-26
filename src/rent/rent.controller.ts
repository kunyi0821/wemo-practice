import { Controller, Post, Get, HttpCode, Body, Request, UseGuards } from "@nestjs/common";
import { RentService } from "./rent.service";
import { RentDto } from "./rent.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("rent")
export class RentController {
    constructor(private readonly rentService: RentService) {}

    @UseGuards(AuthGuard)
    @Get()
    @HttpCode(200)
    getUser(@Request() req): Promise<any> {
        const data = {
            user_id: req.user.user_id
        }
        return this.rentService.getRent(data);
    };

    @UseGuards(AuthGuard)
    @Post("start")
    @HttpCode(201)
    rentStart(@Request() req, @Body() postData: RentDto.RentStartDto): any {
        postData.user_id = req.user.user_id;
        return this.rentService.startRent(postData);
    };

    @UseGuards(AuthGuard)
    @Post("end")
    @HttpCode(201)
    rentEnd(@Request() req, @Body() postData: RentDto.RentStartDto): any {
        postData.user_id = req.user.user_id;

        return this.rentService.endRent(postData);
    };
    


}
