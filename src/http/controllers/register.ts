import { z } from "zod";
import { FastifyRequest, FastifyReply } from  "fastify"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-alreay-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try{
        const resterUserUseCase = makeRegisterUseCase();
        
        await resterUserUseCase.execute({
            name,
            email,
            password
        })
    }catch(err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message});
        }

        throw err;
    }

    return reply.status(201).send();
}