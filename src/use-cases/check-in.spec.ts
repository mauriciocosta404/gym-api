import {expect, it, describe, beforeEach, vi, afterEach} from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
 
let checkInsRepository : InMemoryCheckInsRepository;
let gymsRepository : InMemoryGymsRepository;
let sut : CheckinUseCase;

describe('Check-in use case', () => {
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository(); 
        sut = new CheckinUseCase(checkInsRepository, gymsRepository);

        gymsRepository.items.push({
            id: "gym_01",
            title: "javascript gym",
            phone:"",
            description:"0",
            latitude:  new Decimal(0),
            longitude: new Decimal(0),
        })

        vi.useFakeTimers();
    })

    afterEach(()=>{
        vi.useRealTimers();
    });

    it('should be able to check in', async () =>{
        const { checkIn } = await sut.execute({
            gymId: "gym_01",
            userId: "user_01",
            userLatitude: -8.8876903,
            userLongitude: 13.1565207
        });
        
        expect(typeof(checkIn.id)).toBe("string");
    });

    it('should not be able to check in twice in the same day', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym_01",
            userId: "user_01",
            userLatitude: -8.8876903,
            userLongitude: 13.1565207
        });
        
        await expect(() => sut.execute({
            gymId: "gym_01",
            userId: "user_01",
            userLatitude: -8.8876903,
            userLongitude: 13.1565207
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    });

    
    it('should not be able to check in twice but in diffrent days', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym_01",
            userId: "user_01",
            userLatitude: -8.8876903,
            userLongitude: 13.1565207
        });
        
        vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));


        const { checkIn } = await sut.execute({
            gymId: "gym_01",
            userId: "user_01",
            userLatitude: -8.8876903,
            userLongitude: 13.1565207
        });
        
        expect(typeof(checkIn.id)).toBe("string");
    });
});
