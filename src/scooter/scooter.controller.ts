import { Controller, Post, Put, Get, Delete, HttpCode, Body} from "@nestjs/common";
import { ScooterService } from "./scooter.service";
import { ScooterDto } from "./scooter.dto";

@Controller("scooter")
export class ScooterController {
    constructor(private readonly scooterService: ScooterService) {}

    @Get()
    @HttpCode(200)
    getScooter(): Promise<ScooterDto.GetScooterDto> {
        return this.scooterService.getScooter();
    };

    @Post()
    @HttpCode(201)
    addScooter(@Body() postData: ScooterDto.AddScooterDto): any {

       return this.scooterService.addScooter(postData);
    };

}
