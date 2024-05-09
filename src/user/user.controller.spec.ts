import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

describe("UserController", () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe("getUser", () => {
        it('should return an array of scooter', async () => {
            const result: UserDto.GetUserDto[] = [
                {
                    user_id: 1,
                    user_name: "test",
                    email: ""
                },
            ];
            jest.spyOn(userService, "getUser").mockImplementation(async() => result);
        
            expect(await userController.getUser()).toBe(result);
        });
    });

    describe("addUser", () => {
        it('should add a new user', async () => {
            const newUser: UserDto.AddUserDto = {
                account: "t12345678",
                user_name: "Test",
                password: "Tt12345678"
            };

            const result: object = {};

            jest.spyOn(userService, "addUser").mockImplementation(async() => result);
        
            expect(await userController.addUser(newUser)).toBe(result);
        });
    });
})