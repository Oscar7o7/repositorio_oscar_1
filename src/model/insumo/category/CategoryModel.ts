
import { Prisma, PrismaClient } from "@prisma/client";
import AbstractModel from "../../AbstractModel";

class CategoryModel extends AbstractModel {

    constructor() {
        super();
    } 

    public async countCategory({filter}: {filter:Prisma.CategoryWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.category.count({
            where: {
                ...filter,
                isDelete: false
            }
        });
    }

    public async findCategory({filter}: {filter:Prisma.CategoryWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.category.findFirst({
            where: {
                ...filter
            },
            include: {
                createReference: true,
                _count: true,
                insumo: {
                    skip: 0,
                    take: 50
                }
            }
        });
    }

    public async findManyCategory({filter,skip,take}: {filter:Prisma.CategoryWhereInput,skip:number,take:number}) {
        const prisma = new PrismaClient();
        return prisma.category.findMany({
            where: {
                ...filter,
                isDelete: false
            },
            include: {
                createReference: true,
                _count: true
            },
            orderBy: {createAt:"asc"},
            skip,
            take
        });
    }

    public async createCategory({data}: {data:Prisma.CategoryCreateInput}) {
        const prisma = new PrismaClient();

        return prisma.category.create({ 
            data: {
                ...data,
            }
        });
    }

    public async deleteCategory({id}: {id:string}) {
        const prisma = new PrismaClient();
        return prisma.category.update({
            where: { id },
            data: {
                isDelete: true
            }
        })
    }

    public async updateCategory({id, data}: {id:string,data:Prisma.CategoryUpdateInput}) {
        const prisma = new PrismaClient();
        return prisma.category.update({
            where: {id},
            data: data
        })
    }
}

export default CategoryModel;

