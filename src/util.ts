import * as fs from "fs";
import { parse } from 'csv-parse';

type AwsRecordRaw = {
    year: string,
    month : string,
    accountId : string,
    serviceName : string,
    rawRegion : string,
    region : string,
    rawSubServiceName : string,
    subServiceName : string,
    usage : string,
    unit : string,
    rawDescription : string,
    description : string,
    pricePerUnit : string,
    prices : string,
    saves : string,
    nets : string
}

type AwsRecordModel = {
    year: number,
    month : number,
    accountId : string,
    serviceName : string,
    rawRegion : string,
    region : string,
    rawSubServiceName : string,
    subServiceName : string,
    usage : number,
    unit : string,
    rawDescription : string,
    description : string,
    pricePerUnit : number,
    prices : number,
    saves : number,
    nets : number
}

type AwsAccount = {
    accountId : string,
    accountName : string
}

export const read_aws_record = async (filename:string) : Promise<AwsRecordRaw[]> => {
    return new Promise((resolve, reject) => {
        const csvFilePath = `aws/records/${filename}`;
        const headers = ['year', 'month', 'accountId','serviceName','rawRegion', 'region', 'rawSubServiceName', 'subServiceName','usage', 'unit', 'rawDescription', 'description','pricePerUnit', 'prices', 'saves', 'nets'];
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        parse(fileContent, {
          delimiter: ',',
          columns: headers
        }, (error, result: AwsRecordRaw[]) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        });
    })
}
export const formatRawToModel = (data :  AwsRecordRaw) : AwsRecordModel => {
    return {
        ...data,
        year : parseInt(data.year),
        month : parseInt(data.month),
        pricePerUnit : parseFloat(data.pricePerUnit),
        prices : parseFloat(data.prices),
        saves : parseFloat(data.saves),
        nets : parseFloat(data.nets),
        usage : parseFloat(data.usage)
    }
}

export const read_aws_account= async () : Promise<AwsAccount[]> => {
    return new Promise((resolve, reject) => {
        const csvFilePath = 'aws/accounts.csv';
        const headers = ['accountId', 'accountName'];
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        parse(fileContent, {
          delimiter: ',',
          columns: headers
        }, (error, result: AwsAccount[]) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        });
    })
}



