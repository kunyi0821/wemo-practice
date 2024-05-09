import { IsNotEmpty, IsString, Matches, IsNumber, IsBoolean } from 'class-validator';

export namespace ScooterDto {
    export class GetScooterDto {
        @IsNumber()
        @IsNotEmpty()
        scooter_id: number;

        @IsString()
        @IsNotEmpty()
        license_plate: string;

        @IsBoolean()
        @IsNotEmpty()
        is_use: boolean;

        @IsBoolean()
        @IsNotEmpty()
        is_enable: boolean;

        @IsString()
        @IsNotEmpty()
        created_at: string;
    }

    

    /**
     * @param {string} license_plate 車牌號碼
     */
    export class AddScooterDto {

        @IsNotEmpty()
        @IsString()
        @Matches(/^[A-Z]{3}-[0-9]{4}$/, {
            message: 'License plate must conform to specifications.',
        })
        license_plate: string;
    }
}