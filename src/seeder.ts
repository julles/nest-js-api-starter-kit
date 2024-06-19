import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './database/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeederService);

  await seeder.run();

  process.exit();
}
bootstrap();
