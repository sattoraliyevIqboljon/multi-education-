import fp from "fastify-plugin";
import { BaseResponse } from "../error/base.response";


async function reply(server, optinons) {
    server.decorateReply("success", function (resultData: any) {
        const result = BaseResponse.Success(resultData);
        this.status(200).send({
            ...result,
            time: new Date(),
        })
    })

    server.setErrorHandler((error, request, reply) => {
        if (error instanceof BaseResponse) {
            reply.status(400).send(error)
        } else {
            reply.send(error)
        }
    })

    // next();
}

export const replyPlugin = fp(reply)