import fastify from "fastify";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);