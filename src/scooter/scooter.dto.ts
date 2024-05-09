export namespace ScooterDto {
    export class GetScooterDto {
        scooter_id: number;
        license_plate: string;
        is_use: boolean;
        is_enable: boolean;
        created_at: string;
        updated_at: string;
    }

    

    /**
     * @param {string} license_plate 車牌號碼
     */
    export class AddScooterDto {
        license_plate: string;
    }
}