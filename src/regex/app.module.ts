import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/src/app.module';
import { RegexService } from './app.service';


@Global()
@Module({
  imports: [PrismaModule],
  providers: [RegexService]
})
export class RegexModule {}