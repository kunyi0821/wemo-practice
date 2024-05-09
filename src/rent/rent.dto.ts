export namespace RentDto {
   
    /**
     * @param {number} scooter_id   機車編號
     */
    export class AddRentDto {
        scooter_id: number;
    }

    /**
     * @param {number} user_id      使用者編號
     * @param {number} scooter_id   機車編號
     */

    export class RentStartDto {
        user_id: number;
        scooter_id: number;
    }

}