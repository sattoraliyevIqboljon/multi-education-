import fastify from "fastify";
import { ENV } from "../common/config/config";
import { connectDb } from "../common/db/connector";

const server = fastify();

async function start() {
    try {
        await connectDb()

        server.listen({ port: ENV.ADMIN_PORT, host: ENV.HOST })
        console.log("Server running....")
        console.log("Url : http://localhost:" + ENV.ADMIN_PORT)
    } catch (e) {
        console.log("Error to running server____")
        console.log(e)
    }
}

start();
