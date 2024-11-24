import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(8080);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any properties not defined in the schema
      transform: true, // transform the data to the type defined in the schema
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
