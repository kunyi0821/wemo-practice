export namespace RentDto {
   
    /**
     * @param {number} user_id      會員編號
     * @param {number} scooter_id   機車編號
     */
    export class AddRentDto {
        user_id: number;
        scooter_id: number;
    }

}