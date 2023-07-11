import { Injectable } from "@nestjs/common";
import { read_aws_account, read_aws_record , formatRawToModel } from "../util";
import { PrismaService } from "../../prisma/src/app.service";

@Injectable()
export class SeedService {
    constructor (private readonly prismaService : PrismaService){}
    async seedData() {
        const accounts = await read_aws_account()
        await this.prismaService.awsAccount.createMany({data:accounts})
        const records = await read_aws_record('2023_6_538519349342_Accounts.csv')
        const model_records = records.map((record) => {
            return formatRawToModel(record)
        })
        await this.prismaService.awsRecord.createMany({data:model_records})
        console.log("Init Success")
    }
}

