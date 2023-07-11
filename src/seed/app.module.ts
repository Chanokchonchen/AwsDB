import { Global, Module } from '@nestjs/common';
import { SeedService } from './app.service';
import { PrismaModule } from '../../prisma/src/app.module';


@Global()
@Module({
  imports: [PrismaModule],
  providers: [SeedService]
})
export class SeedModule {}