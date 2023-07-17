import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/src/app.service";
import { subServiceNameDict, regexPatternDescription } from "./regex";

@Injectable()
export class RegexService {

    constructor(private readonly prismaService : PrismaService){}

    async formatAll() {
        const results = await this.prismaService.awsRecord.findMany()
        results.forEach(async (res) => {
            const [pricePerUnit,description] = this.matchRegexDescription(res.rawSubServiceName,res.rawDescription,Number(res.usage),Number(res.prices))
            const subServiceName = this.clean_sub_service(res.serviceName,res.rawSubServiceName)
            const newResult = {...res,pricePerUnit,description,subServiceName}
            await this.prismaService.awsRecord.update({
                where:{
                    id:res.id
                },
                data : newResult
            })
        })
    }

    matchRegexDescription(sub_service_name : string,des : string,usage : number,price : number) : [number , string] {
        if (!regexPatternDescription.hasOwnProperty(sub_service_name)) {
            if (sub_service_name === "") {
                return [1,""]
            } else {
                console.log(`Not Found Regex for this : ${sub_service_name}`)
                return [0 , des.toLowerCase()]
            }
        } 
        const regexs = regexPatternDescription[sub_service_name] as RegExp[]
        if (regexs.length == 0) {
            return [0,des.toLowerCase()]
        }
        for (let i = 0; i < regexs.length; i++) { 
            const regex = regexs[i]
            const result = des.match(regex)
            if (result) {
                const info = result.slice(1)
                if (info.length == 2){
                    if (info[1].toLowerCase() === 'savings plan') {
                        return [price, info.slice(1).join(' ').toLowerCase()]
                    }
                    return [parseFloat(info[0]), info[1].toLowerCase()]
                } else if (info.length == 1) {
                    return [price/usage,info[0].toLowerCase()]
                } else {
                    return [parseFloat(info[0]), info.slice(1).join(' ').toLowerCase()]
                }
            }
        }
        console.log(`Current Regexs don't match this : ${sub_service_name}`)
        return [0 , des.toLowerCase()]
    }

    clean_sub_service(service_name : string,sub_service_name : string) {
        if (subServiceNameDict.hasOwnProperty(sub_service_name)) {
            return subServiceNameDict[sub_service_name]
        } else {
            if (service_name !== "Vat") {
                console.log(`Key ${sub_service_name} does not exist please add to dict`)
            }  
            return sub_service_name
        }

    }

}