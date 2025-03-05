import { checkIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import {InvalidCredentialsError} from "./errors/invalid-credentials-error"
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

interface CheckinUseCaseRequest{
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckinUseCaseResponse {
    checkIn: checkIn;
}

export class CheckinUseCase{
    constructor(
        private checkinsRepository : CheckInsRepository,
        private gymsRepository : GymsRepository
    ){}

    async execute({userId, gymId}: CheckinUseCaseRequest) : Promise<CheckinUseCaseResponse>{
        const gym = this.gymsRepository.findById(gymId);

        if(!gym){
            throw new ResourseNotFoundError();
        }

        const checkinOnSameDate = await this.checkinsRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if(checkinOnSameDate){
            throw new InvalidCredentialsError();
        }

        const checkIn = await this.checkinsRepository.create({
            user_id: userId,
            gym_id: gymId
        });
       
        return { 
            checkIn
        };
    }
}