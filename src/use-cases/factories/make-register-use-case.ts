import { PrismaUsersRepository } from "@/repositories/prima/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase(){
    const usersRepository = new PrismaUsersRepository();
    const resterUserUseCase = new RegisterUseCase(usersRepository);

    return resterUserUseCase;
}