import {expect, it, describe, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import  bcryptjs from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
const { hash } = bcryptjs;

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () =>{
        
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
        
        expect(() => sut.execute({
            email:"jhondoea@example.com",
            password:"123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () =>{
        
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
