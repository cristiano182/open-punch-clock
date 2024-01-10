import { FastifyRequest } from "fastify"


export type MyRequest<IBody> = FastifyRequest<{
    Body: IBody
}>