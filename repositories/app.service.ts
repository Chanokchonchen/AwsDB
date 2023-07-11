import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/src/app.service";

@Injectable()
export class AwsRepository {
    constructor (private readonly prismaService : PrismaService){
    }


}