import fp from "fastify-plugin";
import { clearAllLogsHandler, createTeacherHandler, deleteTeacherHandler, getExelHandler, getMySelfHandler, getPagingLogsHandler, getTeacherByIdHandler, getTeacherByPagingHandler, loginTeacherHandler, updatePasswordHandler, updateTeacherHandler } from "../handler/teacher.handler";

async function teacher(server, opt) {
    server.post("/teacher", { preValidation: server.authAdmin }, createTeacherHandler)  //
    server.post("/teacher/login", loginTeacherHandler)//
    server.get("/teacher/:_id", { preValidation: server.authAdmin }, getTeacherByIdHandler)//
    server.get("/teacher/paging", { preValidation: server.authAdmin }, getTeacherByPagingHandler)//
    server.get("/teacher/myself", { preValidation: server.authAdmin }, getMySelfHandler)//
    server.put("/teacher/:_id", { preValidation: server.authAdmin }, updateTeacherHandler)//
    server.put("/teacher/password", { preValidation: server.authAdmin }, updatePasswordHandler)//
    server.delete("/teacher/:_id", { preValidation: server.authAdmin }, deleteTeacherHandler)


    server.get("/teacher/logs", { preValidation: server.authAdmin }, getPagingLogsHandler)
    server.delete("/teacher/logs", { preValidation: server.authAdmin }, clearAllLogsHandler)

    server.get("/teacher/excel", getExelHandler)

}

export const teacherPlugin = fp(teacher);
