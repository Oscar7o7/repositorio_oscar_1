
import { Prisma, PrismaClient } from "@prisma/client";
import AbstractModel from "../AbstractModel";

class InsumoModel extends AbstractModel {

    constructor() {
        super();
    } 

    public async countInsumo({filter}: {filter:Prisma.InsumoWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.insumo.count({
            where: {
                ...filter,
                isDelete: false
            }
        });
    }

    public async findInsumo({filter}: {filter:Prisma.InsumoWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.insumo.findFirst({
            where: {
                ...filter
            },
            include: {
                createReference: true,
                _count: true,
                categoryReference: true
            }
        });
    }

    public async findManyInsumo({filter,skip,take}: {filter:Prisma.InsumoWhereInput,skip:number,take:number}) {
        const prisma = new PrismaClient();
        return prisma.insumo.findMany({
            where: {
                ...filter,
                isDelete: false
            },
            include: {
                createReference: true,
                categoryReference: true,
                _count: true
            },
            orderBy: {createAt:"asc"},
            skip,
            take
        });
    }

    public async findManyInsumoMinStock({skip,take}: {skip:number,take:number}) {
        const prisma = new PrismaClient();
        const result = await prisma.insumo.findMany({
            where: {isDelete:false},
            select: { id:true,quantity:true,minStock:true,maxStock:true }
        });
    }

    public async createInsumo({data}: {data:Prisma.InsumoCreateInput}) {
        const prisma = new PrismaClient();

        return prisma.insumo.create({ 
            data: {
                ...data,
            }
        });
    }

    public async deleteInsumo({id}: {id:string}) {
        const prisma = new PrismaClient();
        return prisma.insumo.update({
            where: { id },
            data: {
                isDelete: true
            }
        })
    }

    public async updateInsumo({id, data}: {id:string,data:Prisma.InsumoUpdateInput}) {
        const prisma = new PrismaClient();

        const found = await prisma.insumo.findFirst({ where:{id} });

        if(found) {
            if(data.minStock && typeof data.minStock === `number` && Number(data.minStock) > found.quantity) data.isMin = true;
            if(data.maxStock && typeof data.maxStock === `number` && Number(data.maxStock) < found.quantity) data.isMax = true;
        }

        return prisma.insumo.update({
            where: {id},
            data: data
        })
    }
}

export default InsumoModel;

