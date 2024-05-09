import { Test } from "@nestjs/testing";
import { ScooterController } from "./scooter.controller";
import { ScooterService } from "./scooter.service";
import { ScooterDto } from "./scooter.dto";

describe("ScooterController", () => {
    let scooterController: ScooterController;
    let scooterService: ScooterService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ScooterController],
            providers: [ScooterService],
        }).compile();

        scooterService = moduleRef.get<ScooterService>(ScooterService);
        scooterController = moduleRef.get<ScooterController>(ScooterController);
    });

    describe("getScooter", () => {
        it('should return an array of scooter', async () => {
            const result: ScooterDto.GetScooterDto[] = [
                {
                    scooter_id: 1,
                    license_plate: "TTEQD9",
                    is_use: true,
                    is_enable: true,
                    created_at: "2024-05-07T23:53:55.000Z"
                },
            ];
            jest.spyOn(scooterService, "getScooter").mockImplementation(async() => result);
        
            expect(await scooterController.getScooter()).toBe(result);
        });
    });

    describe("addScooter", () => {
        it('should add a new scooter', async () => {
            const newScooter: ScooterDto.AddScooterDto = {
                license_plate: "TTT1111",
            };

            const result: object = {};

            jest.spyOn(scooterService, "addScooter").mockImplementation(async() => result);
        
            expect(await scooterController.addScooter(newScooter)).toBe(result);
        });
    });
})