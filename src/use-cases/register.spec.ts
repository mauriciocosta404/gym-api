import {test, expect, it, describe} from "vitest";
import { RegisterUseCase } from "./register";
import { PrismaUsersRepository } from "@/repositories/prima/prisma-users-repository";
import { compare } from "bcryptjs";

describe('Register use case', () => {
    it('should hash user password upon registration', async () =>{
        const prismaUserRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(prismaUserRepository);
        
        const { user } = await registerUseCase.execute({
            name:"John Doe",
            email:"jhondoea@example.com",
            password:"123456"
        })

        const isPasswordHashed = compare(
            '123456',
            user.password_hash,
        );

        expect(isPasswordHashed).toBe(true);
    });
});
