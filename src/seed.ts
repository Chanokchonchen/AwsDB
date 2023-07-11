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

// import { PrismaService } from "prisma/src/app.service";
// import { read_aws_account, read_aws_record , formatRawToModel } from "./util";

// const prismaService : PrismaService = new PrismaService()

// const initDB = async () => {
//     const accounts = await read_aws_account()
//     await prismaService.awsAccount.createMany({data:accounts})
//     const records = await read_aws_record('2023_6_538519349342_Accounts.csv')
//     const model_records = records.map((record) => {
//         return formatRawToModel(record)
//     })
//     await prismaService.awsRecord.createMany({data:model_records})
//     console.log("Init Success")
// }
// void initDB()