import { z } from "zod";
import { FastifyRequest, FastifyReply } from  "fastify"
import { PrismaUsersRepository } from "@/repositories/prima/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = registerBodySchema.parse(request.body);

    try{
        const usersRepository = new PrismaUsersRepository();
        const authenticateUserUseCase = new AuthenticateUseCase(usersRepository);
        
        await authenticateUserUseCase.execute({
            email,
            password
        })
    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message});
        }

        throw err;
    }

    return reply.status(201).send();
}