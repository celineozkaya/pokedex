import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // securité
  app.enableCors({
    origin: 'http://localhost:5173', // autorise frontend
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
