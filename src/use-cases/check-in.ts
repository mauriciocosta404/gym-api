import { checkIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckinUseCaseRequest{
    userId: string;
    gymId: string;
}

interface CheckinUseCaseResponse {
    checkIn: checkIn;
}

export class CheckinUseCase{
    constructor(
        private checkinsRepository : CheckInsRepository
    ){}

    async execute({userId, gymId}: CheckinUseCaseRequest) : Promise<CheckinUseCaseResponse>{
        const checkIn = await this.checkinsRepository.create({
            user_id: userId,
            gym_id: gymId
        });
       
        return { 
            checkIn
        };
    }
}