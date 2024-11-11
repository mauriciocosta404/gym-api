import {expect, it, describe, beforeEach} from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alreay-exists";
import { UsersRepository } from "@/repositories/users-repository";

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    })

    it('should be able to register', async () =>{
        
        const { user } = await sut.execute({
            name:"John Doe",
            email:"jhondoea@example.com",
            password:"123456"
        });
        
        expect(typeof(user.id)).toBe("string");
    });

    it('should hash user password upon registration', async () =>{
    
        const { user } = await sut.execute({
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
        
        const email = "jhondoea@example.com";

        await sut.execute({
            name:"John Doe",
            email: email,
            password:"123456"
        })

        await expect(()=>sut.execute({
            name:"John Doe",
            email: email,
            password:"123456"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
