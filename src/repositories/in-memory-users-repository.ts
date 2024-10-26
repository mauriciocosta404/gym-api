import { Prisma } from "@prisma/client";

export class PrismaUsersRepository{
    private users : Prisma.UserCreateInput[]= [];

    async create(data : Prisma.UserCreateInput){
        this.users.push(data)

        return this.users;
    }
}