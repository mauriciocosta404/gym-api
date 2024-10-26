import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from  "fastify"
import { hash } from "bcryptjs";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try{
        const usersRepository = new PrismaUsersRepository();
        const resterUserUseCase = new RegisterUseCase(usersRepository);
        
        await resterUserUseCase.execute({
            name,
            email,
            password
        })
    }catch(err){
        return reply.status(409).send(err);
    }

    return reply.status(201).send()
}