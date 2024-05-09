import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
    private readonly redisClient;

    constructor() {
        console.log("hello")
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: 6379,
            password: process.env.REDIS_PASSWORD
        });

        // 監聽連接錯誤事件
        this.redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });

        // (async () => {
        //     console.log("Running test...");
        //     // await this.set("aa", "AAA");
        //     await this.hset(1, "rent", "2024-08-02")
        //     console.log("hget", await this.hget(1, "rent"));

        //     await this.hdel(1, "rent");

        //     if (!await this.hdel(1, "rent")) {
        //         console.log("no data")
        //     }
            
        // })();
    }
    
    async get(key: number | string): Promise<number | string | null> {
        return this.redisClient.get(key);
    }

    async set(key: number | string, value: number | string): Promise<void> {
        await this.redisClient.set(key, value);
    }

    async del(key: number | string): Promise<void> {
        await this.redisClient.del(key);
    }

    async scan(cursor: number): Promise<[number, string[]]> {
        return this.redisClient.scan(cursor);
    }

    async hget(key: number | string, field: string): Promise<number | string | null> {
        return this.redisClient.hget(key, field);
    }

    async hset(key: number | string, field: string, value: number | string): Promise<void> {
        await this.redisClient.hset(key, field, value);
    }

    async hdel(key: number | string, fields: string): Promise<number> {
        return this.redisClient.hdel(key, fields);
    }
}