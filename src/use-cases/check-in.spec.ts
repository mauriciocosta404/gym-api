import {expect, it, describe, beforeEach, vi, afterEach} from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
 
let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckinUseCase;

describe('Check-in use case', () => {
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckinUseCase(checkInsRepository);

        vi.useFakeTimers();
    })

    afterEach(()=>{
        vi.useRealTimers();
    });

    it('should be able to check in', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        });
        
        expect(typeof(checkIn.id)).toBe("string");
    });

    it('should not be able to check in twice in the same day', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        });
        
        await expect(() => sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    });

    
    it('should not be able to check in twice but in diffrent days', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        });
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));


        const { checkIn } = await sut.execute({
            gymId: "gym_01",
            userId: "user_01"
        });
        
        expect(typeof(checkIn.id)).toBe("string");
    });
});
