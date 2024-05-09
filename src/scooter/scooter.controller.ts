import { Controller, Post, Put, Get, Delete, HttpCode, Body} from "@nestjs/common";
import { ScooterService } from "./scooter.service";
import { ScooterDto } from "./scooter.dto";

@Controller("scooter")
export class ScooterController {
    constructor(private readonly scooterService: ScooterService) {}

    @Get()
    @HttpCode(200)
    getUser(): Promise<ScooterDto.GetScooterDto> {
        return this.scooterService.getScooter();
    };

    @Post()
    @HttpCode(201)
    getUser2(@Body() postData: ScooterDto.AddScooterDto): any {

        if (!postData.license_plate) {
            console.error("license_plate is necessary");
            return {error: "license_plate is necessary"};
        }

       return this.scooterService.addScooter(postData);
    };

}
