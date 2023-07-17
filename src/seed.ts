import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/app.module';
import { SeedService } from './seed/app.service';


async function bootstrap() {

  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.seedData();
  await app.close();
}

void bootstrap();

