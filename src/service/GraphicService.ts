import { Prisma, PrismaClient } from "@prisma/client";
import AbstractModel from "../model/AbstractModel";
import { MONTH_STRUCT, STATUS } from "../types/app";

export default class GraphicService extends AbstractModel {

    constructor () {
        super();
    }

    public async MonthGraphic({objectName,objectId,month}:{ objectName:string,objectId?:string,month:string }) {
        const prisma = new PrismaClient();
        const model = new AbstractModel();

        const months = model.getAllMonths();


    }

    public async MonthGraphicQuote({month,id,ObjectName}:{ month?:number, id?:string,ObjectName?:string }) {
        const prisma = new PrismaClient();
        const model = new AbstractModel();
        const months = model.getAllMonths();
        const monthFind = month ? Number(month) : model.getMonth();

        if(id) {
            const result = await prisma.staticticsMonth.findFirst({ where:{AND:[{objectId:id},{monthNumber:monthFind}]} });
            const label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
            const data = [
                result?.totalDay1,
                result?.totalDay2,
                result?.totalDay3,
                result?.totalDay4,
                result?.totalDay5,
                result?.totalDay6,
                result?.totalDay7,
                result?.totalDay8,
                result?.totalDay9,
                result?.totalDay10,
                result?.totalDay11,
                result?.totalDay12,
                result?.totalDay13,
                result?.totalDay14,
                result?.totalDay15,
                result?.totalDay16,
                result?.totalDay17,
                result?.totalDay18,
                result?.totalDay19,
                result?.totalDay20,
                result?.totalDay21,
                result?.totalDay22,
                result?.totalDay23,
                result?.totalDay24,
                result?.totalDay25,
                result?.totalDay26,
                result?.totalDay27,
                result?.totalDay28,
                result?.totalDay29,
                result?.totalDay30,
                result?.totalDay31,
            ];

            return {label,data};
        }


        const filter: Prisma.StaticticsMonthWhereInput[] = [{monthNumber: monthFind},{objectName:ObjectName?ObjectName:`CITAS`}];
        // if(id) filter.push({ objectId:id });

        const result = await prisma.staticticsMonth.findFirst({ where:{AND:filter} });
        const label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        const data = [
            result?.totalDay1,
            result?.totalDay2,
            result?.totalDay3,
            result?.totalDay4,
            result?.totalDay5,
            result?.totalDay6,
            result?.totalDay7,
            result?.totalDay8,
            result?.totalDay9,
            result?.totalDay10,
            result?.totalDay11,
            result?.totalDay12,
            result?.totalDay13,
            result?.totalDay14,
            result?.totalDay15,
            result?.totalDay16,
            result?.totalDay17,
            result?.totalDay18,
            result?.totalDay19,
            result?.totalDay20,
            result?.totalDay21,
            result?.totalDay22,
            result?.totalDay23,
            result?.totalDay24,
            result?.totalDay25,
            result?.totalDay26,
            result?.totalDay27,
            result?.totalDay28,
            result?.totalDay29,
            result?.totalDay30,
            result?.totalDay31,
        ];

        return {label,data};
    }

    public async YearGraphicQuote({year,id,ObjectName}:{ year?:number , id?:string, ObjectName?:string}) {
        const prisma = new PrismaClient();
        const model = new AbstractModel();
        const yearFind = year ? Number(year) : model.getYear();

        if(id) {
            const result = await prisma.staticticsYear.findFirst({ where:{AND:[{objectId:id},{year:yearFind}]} });
            const label: string[] = [];
            model.getAllMonths().forEach((item) => {
                label.push(item.label);
            })
            const data = [
                result?.totalMonth1,
                result?.totalMonth2,
                result?.totalMonth3,
                result?.totalMonth4,
                result?.totalMonth5,
                result?.totalMonth6,
                result?.totalMonth7,
                result?.totalMonth8,
                result?.totalMonth9,
                result?.totalMonth10,
                result?.totalMonth11,
                result?.totalMonth12,
            ];
    
            return {label,data};
        }

        const filter: Prisma.StaticticsYearWhereInput[] = [{year: yearFind},{objectName:ObjectName?ObjectName:`CITAS`}];
        // if(id) filter.push({ objectId:id });

        const result = await prisma.staticticsYear.findFirst({ where:{AND:filter} });
        const label: string[] = [];
        model.getAllMonths().forEach((item) => {
            label.push(item.label);
        })
        const data = [
            result?.totalMonth1,
            result?.totalMonth2,
            result?.totalMonth3,
            result?.totalMonth4,
            result?.totalMonth5,
            result?.totalMonth6,
            result?.totalMonth7,
            result?.totalMonth8,
            result?.totalMonth9,
            result?.totalMonth10,
            result?.totalMonth11,
            result?.totalMonth12,
        ];

        return {label,data};
    }

    public async GenerateYear({ year, id, ObjectName }: { year?:number , id?:string, ObjectName?:string }) {
        const prisma = new PrismaClient();
        const model = new AbstractModel();

        const found = await prisma.staticticsYear.findFirst({ 
            where:{
                AND: [
                    { objectId:id },
                    { objectName: ObjectName },
                    { year: year ? Number(year) : model.getYear() }
                ]
            }
        });

        if (found) {
            return [
                found.totalMonth1,
                found.totalMonth2,
                found.totalMonth3,
                found.totalMonth4,
                found.totalMonth5,
                found.totalMonth6,
                found.totalMonth7,
                found.totalMonth8,
                found.totalMonth9,
                found.totalMonth10,
                found.totalMonth11,
                found.totalMonth12,
            ]
        }

        return [0,0,0,0,0,0,0,0,0,0,0,0];
    }

    public async GenerateMonth({ month, id, ObjectName, year }: { month?:number , id?:string, ObjectName?:string,year:number }) {
        const prisma = new PrismaClient();
        const model = new AbstractModel();

        const found = await prisma.staticticsMonth.findFirst({ 
            where:{
                AND: [
                    { objectId:id },
                    { objectName: ObjectName },
                    { monthNumber: month ? month : model.getMonth() },
                    { year: Number(year) },
                ]
            }
        });

        if (found) {
            return [
                found.totalDay1,
                found.totalDay2,
                found.totalDay3,
                found.totalDay4,
                found.totalDay5,
                found.totalDay6,
                found.totalDay7,
                found.totalDay8,
                found.totalDay9,
                found.totalDay10,
                found.totalDay11,
                found.totalDay12,
                found.totalDay13,
                found.totalDay14,
                found.totalDay15,
                found.totalDay16,
                found.totalDay17,
                found.totalDay18,
                found.totalDay19,
                found.totalDay20,
                found.totalDay21,
                found.totalDay22,
                found.totalDay23,
                found.totalDay24,
                found.totalDay25,
                found.totalDay26,
                found.totalDay27,
                found.totalDay28,
                found.totalDay29,
                found.totalDay30,
                found.totalDay31,
            ]
        }
        return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
}
