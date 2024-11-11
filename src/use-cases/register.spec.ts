import {expect, it, describe} from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alreay-exists";

describe('Register use case', () => {
    it('should be able to register', async () =>{
        const inMemoryUserRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);
        
        const { user } = await registerUseCase.execute({
            name:"John Doe",
            email:"jhondoea@example.com",
            password:"123456"
        });
        
        expect(typeof(user.id)).toBe("string");
    });

    it('should hash user password upon registration', async () =>{
        const inMemoryUserRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);
        
        const { user } = await registerUseCase.execute({
            name:"John Doe",
            email:"jhondoea@example.com",
            password:"123456"
        })

        const isPasswordCorretlyHashed = await compare(
            '123456',
            user.password_hash,
        );

        expect(isPasswordCorretlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () =>{
        const inMemoryUserRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);
        
        const email = "jhondoea@example.com";

        await registerUseCase.execute({
            name:"John Doe",
            email: email,
            password:"123456"
        })

        await expect(()=>registerUseCase.execute({
            name:"John Doe",
            email: email,
            password:"123456"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
