import { Prisma, PrismaClient } from "@prisma/client";
import AbstractModel from "../AbstractModel";

class UserModel extends AbstractModel {

    constructor() {
        super();
    } 

    public async getYears() {
        const prisma = new PrismaClient();
        const years = await prisma.staticticsYear.findMany({
            select: { year:true }
        });
        const newYears: number[] = [];
        years.forEach(({year}:{year:number}) => {
            if (!newYears.includes(year)) {
                newYears.push(year);
            }
        });

        return newYears;
    }

    public async countUser({filter}: {filter:Prisma.UserWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.user.count({
            where: {
                ...filter,
                isDelete: false
            }
        });
    }

    public async findUser({filter}: {filter:Prisma.UserWhereInput}) {
        const prisma = new PrismaClient();
        return prisma.user.findFirst({
            where: {
                ...filter,
                isDelete: false
            },
            include: {
                category: {
                    skip: 0,
                    take: 10,
                    select: {
                        _count: true,
                        id: true,
                        name: true,
                    },
                    where: {
                        isDelete:false
                    },
                    orderBy: {
                        name: "asc"
                    }
                },
                insumo: {
                    skip: 0,
                    take: 10,
                    select: {
                        categoryReference: { select: {name:true} },
                        description: true,
                        id: true,
                        name: true,
                    },
                    where: {
                        isDelete:false
                    },
                    orderBy: {
                        name: "asc"
                    }
                },
                _count: true
            }
        });
    }

    public async findManyUser({filter,skip,take}: {filter:Prisma.UserWhereInput,skip:number,take:number}) {
        const prisma = new PrismaClient();
        return prisma.user.findMany({
            where: {
                ...filter,
                isDelete: false
            },
            orderBy: {createAt:"asc"},
            skip,
            take
        });
    }

    public async createUser({data}: {data:Prisma.UserCreateInput}) {
        const prisma = new PrismaClient();

        return prisma.user.create({ 
            data: {
                ...data,
                password: await this.HashPassword({password:data.password})
            }
        });
    }

    public async deleteUser({id}: {id:string}) {
        const prisma = new PrismaClient();
        return prisma.user.update({
            where: { id },
            data: {
                isDelete: true
            }
        })
    }

    public async updateUser({id, data}: {id:string,data:Prisma.UserUpdateInput}) {
        const prisma = new PrismaClient();
        return prisma.user.update({
            where: {id},
            data: data
        })
    }
}

export default UserModel;
