import {expect, it, describe} from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import  bcryptjs from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
const { hash } = bcryptjs;

describe('Authenticate use case', () => {
    it('should be able to authenticate', async () =>{
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        
         await usersRepository.create({
            name: "Jhon Doe",
            email:"jhondoea@example.com",
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            email:"jhondoea@example.com",
            password:"123456"
        });
        
        expect(typeof(user.id)).toBe("string");
    });

    it('should not be able to authenticate with wrong email', async () =>{
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        
        expect(() => sut.execute({
            email:"jhondoea@example.com",
            password:"123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () =>{
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);
        
        await usersRepository.create({
            name: "Jhon Doe",
            email:"jhondoea@example.com",
            password_hash: await hash('123456', 6),
        });

        expect(() => sut.execute({
            email:"jhondoea@example.com",
            password:"123123"
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
