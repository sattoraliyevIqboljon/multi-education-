import fastify from "fastify";
import { ENV } from "../common/config/config";
import { connectDb } from "../common/db/connector";
import { authPlugin } from "../common/middleware/authentication";
import { authAdminPlugin } from "./middleware/middleware";
import { replyPlugin } from "../common/decorator/reply";
import { teacherPlugin } from "./router/teacher.router";
import { studentPlugin } from "./router/student.router";
import { groupPlugin } from "./router/group.router";
import { coursePlugin } from "./router/course.router";
import { timeTablePlugin } from "./router/timetable.router";

const server = fastify();

//auth plugins
server.register(authPlugin)
server.register(authAdminPlugin)

server.register(replyPlugin)
server.register(teacherPlugin)
server.register(studentPlugin)
server.register(groupPlugin)
server.register(coursePlugin)
server.register(timeTablePlugin)


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
