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
     * @param {number} user_id      使用者編號
     * @param {string} user_name    使用者名稱
     * @param {string} password     使用者密碼
     * @param {string} email        使用者信箱
     */
    export class AddUserDto {
        account: string;
        user_name: string;
        password: string;
        email?: string;
    }
}