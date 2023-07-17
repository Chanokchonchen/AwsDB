import { Injectable , Logger } from "@nestjs/common";
import { read_aws_account, read_aws_record , formatRawToModel, getAllFiles } from "../util";
import { PrismaService } from "../../prisma/src/app.service";

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    constructor (private readonly prismaService : PrismaService){}
    async seedData() {
        const accounts = await read_aws_account()
        await this.prismaService.awsAccount.createMany({data:accounts})
        this.logger.log("Init all aws accounts")
        const allFiles = await getAllFiles();
        allFiles.forEach(async (file) => {
            this.logger.log(file)
            const records = await read_aws_record(file)
            const model_records = records.map((record) => {
                return formatRawToModel(record)
            })           
            await this.prismaService.awsRecord.createMany({data:model_records})
        })
        this.logger.log("Init Success")
    }
}

