import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";

dotenv.config({path: "./src/config/.env"});

async function bootstrap() {
    await dotenv.config({path: "./src/config/.env"});

    console.log(process.env.PASSWORD_SECRET_KEY)
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
