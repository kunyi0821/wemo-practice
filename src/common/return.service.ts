import { Injectable } from "@nestjs/common";

@Injectable()
export class ReturnService {
    returnJson(message: string, statusCode: number, data: any): { message: string; statusCode: number; data: any } {
        return { message, statusCode, data };
    }
}