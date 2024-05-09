import { IsNotEmpty, IsString, Matches, MinLength, IsEmail } from 'class-validator';

export namespace UserDto {
    /**
     * @param {number} user_id      使用者編號
     * @param {string} user_name    使用者名稱
     * @param {string} email        使用者信箱
     */
    export class GetUserDto {
        user_id: number;
        user_name: string;
        email?: string;
    }

    /**
     * @param {string} account      使用者帳號
     * @param {string} password     使用者密碼
     */
    export class LoginUserDto {
        @IsNotEmpty()
        @IsString()
        account: string;

        @IsNotEmpty()
        @IsString()
        password: string;
    }

    /**
     * @param {string} account      使用者帳號
     * @param {string} user_name    使用者名稱
     * @param {string} password     使用者密碼
     * @param {string} email        使用者信箱
     */
    export class AddUserDto {
        @IsNotEmpty()
        @IsString()
        @MinLength(8)
        account: string;

        @IsNotEmpty()
        @IsString()
        user_name: string;

        @IsNotEmpty()
        @IsString()
        @MinLength(8)
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
            message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
        })
        password: string;
    }
}