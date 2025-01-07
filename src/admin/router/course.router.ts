import fp from "fastify-plugin";
import { createCourseHandler, getCourseByIdHandler, getCourseByPagingHandler, updateCourseHandler, deleteCourseHandler } from "../handler/course.handler";

async function course(server, opt) {
    server.post("/course", { preValidation: server.authAdmin }, createCourseHandler)
    server.get("/course/:_id", { preValidation: server.authAdmin }, getCourseByIdHandler)
    server.get("/course/paging", { preValidation: server.authAdmin }, getCourseByPagingHandler)
    server.put("/course/:_id", { preValidation: server.authAdmin }, updateCourseHandler)
    server.delete("/course/:_id", { preValidation: server.authAdmin }, deleteCourseHandler)
}

export const coursePlugin = fp(course);
