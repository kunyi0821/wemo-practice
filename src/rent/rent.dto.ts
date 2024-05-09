import { IsNotEmpty, IsString, Matches, MinLength, IsNumber, IsBoolean } from "class-validator";
export namespace RentDto {
    /**
     * @param {number} rent_id      租賃編號
     * @param {number} user_id      使用者編號
     * @param {number} scooter_id   機車編號
     * @param {string} created_date 創建日期
     * @param {string} start_at 租借開始
     * @param {string} end_at   租借結束
     * @param {number} use_time 使用時間
     */
    export class GetRentDto {
        @IsNotEmpty()
        @IsNumber()
        rent_id: number;

        @IsNotEmpty()
        @IsNumber()
        user_id: number;

        @IsNotEmpty()
        @IsNumber()
        scooter_id: number;

        @IsNotEmpty()
        @IsString()
        created_date: string;

        @IsNotEmpty()
        @IsString()
        start_at: string;

        @IsString()
        end_at?: string

        @IsNumber()
        use_time?: number;
    }

    /**
     * @param {number} user_id      使用者編號
     * @param {number} scooter_id   機車編號
     */

    export class RentStartDto {
        user_id: number;

        @IsNotEmpty()
        @IsNumber()
        scooter_id: number;
    }

}