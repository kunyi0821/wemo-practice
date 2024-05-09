import { Request} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";
import { RentDto } from "./rent.dto";

describe("RentController", () => {
    let rentController: RentController;
    let rentService: RentService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RentController],
            providers: [RentService],
        }).compile();

        rentService = moduleRef.get<RentService>(RentService);
        rentController = moduleRef.get<RentController>(RentController);
    });

    describe("getRent", () => {
        it('should return an array of rent', async () => {
            const result: RentDto.GetRentDto[] = [
                {
                    rent_id: 1,
                    user_id: 1,
                    scooter_id: 1,
                    created_date: "2024-05-09",
                    start_at: "2024-05-09 00:00:00",
                    end_at: "",
                    use_time: 0
                },
            ];
            jest.spyOn(rentService, "getRent").mockImplementation(async() => result);
        
            expect(await rentController.getUser()).toBe(result);
        });
    });

    describe("startRent", () => {
        it('should start a rent', async () => {
            const rentInfo: RentDto.RentStartDto = {
                user_id: 1,
                scooter_id: 1
            };

            const result: object = {};

            jest.spyOn(rentService, "startRent").mockImplementation(async() => result);
        
            expect(await rentController.rentStart(Request, rentInfo)).toBe(result);
        });
    });

    describe("endRent", () => {
        it('should end a rent', async () => {
            const rentInfo: RentDto.RentStartDto = {
                user_id: 1,
                scooter_id: 1
            };

            const result: object = {};

            jest.spyOn(rentService, "endRent").mockImplementation(async() => result);
        
            expect(await rentController.rentEnd(Request, rentInfo)).toBe(result);
        });
    });
})