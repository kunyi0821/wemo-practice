import * as dotenv from "dotenv";
dotenv.config({path: "./src/config/.env"}); 

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap();
