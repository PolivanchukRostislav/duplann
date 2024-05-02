import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLoggerService(),
    });
app.use(cookieParser());

  app.enableCors({
    origin: '*',
    credentials: true
  });



  await app.listen(8000);
}
bootstrap();
