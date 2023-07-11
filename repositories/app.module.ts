import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/src/app.module';
import { AwsRepository } from './app.service';


@Global()
@Module({
  imports: [PrismaModule],
  providers: [AwsRepository],
  exports: [AwsRepository],
})
export class RepositoryModule {}