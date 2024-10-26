import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository{
    async create({name, email, password_hash}: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password_hash
            }
        })

        return user;
    }
}