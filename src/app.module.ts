import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/src/app.module';
import { RepositoryModule } from 'repositories/app.module';

@Module({
  imports: [PrismaModule,RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
