import {expect, it, describe, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import  bcryptjs from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";
const { hash } = bcryptjs;

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe('Get user profile use case', () => {
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () =>{
        
         const createdUser = await usersRepository.create({
            name: "Jhon Doe",
            email:"jhondoea@example.com",
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            userId: createdUser.id,
        });
        
        expect(typeof(user.id)).toBe("string");
        expect(user.name).toBe("Jhon Doe");
    });

    it('should not be able to get profile with wrong id', async () =>{
        await expect(() => sut.execute({
            userId: "non-existing-id"
        })).rejects.toBeInstanceOf(ResourseNotFoundError);
    });
});
