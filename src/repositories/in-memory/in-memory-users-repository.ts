import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository{
    private users : Prisma.UserCreateInput[]= [];

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.users.push(data);

        return user;
    }
    
}