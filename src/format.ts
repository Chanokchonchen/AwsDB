import { NestFactory } from '@nestjs/core';
import { RegexModule } from './regex/app.module';
import { RegexService } from './regex/app.service';


async function bootstrap() {

  const app = await NestFactory.createApplicationContext(RegexModule);
  const regexService = app.get(RegexService);
  await regexService.formatAll();
  await app.close();
}

void bootstrap();

