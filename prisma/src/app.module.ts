import { Global, Module } from '@nestjs/common';
import { PrismaService } from './app.service';


@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
