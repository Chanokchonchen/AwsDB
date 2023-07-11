import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/src/app.service';
import { AwsRepository } from 'repositories/app.service';

@Injectable()
export class AppService {

  constructor(private readonly awsRepository : AwsRepository,private readonly prismaService : PrismaService) {
  }

  getHello(): string {
    return 'Hello World!';
  }
}
