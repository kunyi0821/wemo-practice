import { Injectable } from "@nestjs/common";
import * as mysql from "mysql2/promise";

@Injectable()
export class MysqlService {
    private readonly pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "app_user",
            password: process.env.MYSQL_PASSWORD || "app_password",
            database: process.env.MYSQL_DATABASE || "my_database",
            connectionLimit: 10,
        });
    }

    async init(): Promise<mysql.PoolConnection> {
        const connection = await this.pool.getConnection();
        return connection;
    }

    async beginTransaction(connection: mysql.PoolConnection): Promise<void> {
        await connection.beginTransaction();
    }

    async commit(connection: mysql.PoolConnection): Promise<void> {
        await connection.commit();
        connection.release();
    }

    async rollback(connection: mysql.PoolConnection): Promise<void> {
        await connection.rollback();
        connection.release();
    }

    async execute(connection: mysql.PoolConnection, sql: string, values?: any[]): Promise<any> {
        try {
            const [rows, fields] = await connection.query(sql, values);
            return rows;
        } catch (error) {
            console.error(error);
            await this.rollback(connection);
            throw error;
        }
    }
}