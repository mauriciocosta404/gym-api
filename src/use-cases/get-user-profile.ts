import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs from "bcryptjs"; 
const  { compare } =  bcryptjs;
import { User } from "@prisma/client";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

interface GetUserProfileUseCaseRequest{
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User;
}

export class GetUserProfileUseCase{
    constructor(
        private usersRepository: UsersRepository
    ){}

    async execute({userId}: GetUserProfileUseCaseRequest) : Promise<GetUserProfileUseCaseResponse>{
        const user = await this.usersRepository.findById(userId);

        if(!user){
            throw new ResourseNotFoundError();
        }
        
        return { 
            user 
        };
    }
}