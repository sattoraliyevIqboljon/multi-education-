import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin"
import { ENV } from "../config/config"



export async function authToken(req, reply) {
    try {
        req.user = await req.jwtVerify()
    } catch (e) {
        return reply.status(401).send({
            errorCode: 401,
            code: 401,
            message: "Unauthorized"
        })
    }
}

async function plugin(server, opt) {
    server.register(fastifyJwt, { secret: ENV.TOKEN_KEY, sign: { expiresIn: "1y" } })

    server.addHook("onRequest", function (req, reply, next) {
        try {
            req.server = server
        } catch (error) {
            // console.log(error)
        }
        next()
    })

    server.decorate("authToken", authToken)

    // next()
}


export function jwtSign(req, params) {
    return req.server.jwt.sign(params)
}

export function jwtSignUser(req, params) {
    return req.server.jwt.sign(params)
}

export const authPlugin = fp(plugin)