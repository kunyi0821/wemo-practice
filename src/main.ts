import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";

dotenv.config({path: "./config/.env"});

async function bootstrap() {

  console.log(process.env.MYSQL_HOST)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
