import { z } from "zod";
import { FastifyRequest, FastifyReply } from  "fastify"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = registerBodySchema.parse(request.body);

    try{
        const authenticateUserUseCase = makeAuthenticateUseCase();
        
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