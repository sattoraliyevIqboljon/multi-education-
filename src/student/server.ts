import fastify from "fastify";
import 'reflect-metadata';
import { ENV } from "../common/config/config";
import { connectDb } from "../common/db/connector";
import { studentPlugin } from "./router/student.router";
import { authPlugin } from "../common/middleware/authentication";
import { authStudentPlugin } from "./middleware/middleware";
import { replyPlugin } from "../common/decorator/reply";

const server = fastify();
//auth plugins
server.register(authPlugin)
server.register(authStudentPlugin)

server.register(replyPlugin)

server.register(studentPlugin)

async function start() {
    try {
        await connectDb()

        server.listen({ port: ENV.STUDENT_PORT, host: ENV.HOST })
        console.log("Server running....")
        console.log("Url : http://localhost:" + ENV.STUDENT_PORT)
    } catch (e) {
        console.log("Error to running server____")
        console.log(e)
    }
}

start();
