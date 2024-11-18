import {expect, it, describe, beforeEach} from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alreay-exists";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckinUseCase;

describe('Check-in use case', () => {
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckinUseCase(checkInsRepository);
    })

    it('should be able to check in', async () =>{
        
        const { checkIn } = await sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        });
        
        expect(typeof(checkIn.id)).toBe("string");
    });
});
