import fp from "fastify-plugin";
import { clearAllLogsHandler, createTeacherHandler, getExelHandler, getMySelfHandler, getPagingLogsHandler, getTeacherByIdHandler, getTeacherByPagingHandler, loginTeacherHandler, updatePasswordHandler, updateTeacherHandler } from "../handler/employee.handler";

async function teacher(server, opt) {
    server.post("/teacher/create", { preValidation: server.authAdmin }, createTeacherHandler)  ///
    server.post("/teacher/login", loginTeacherHandler)
    server.get("/teacher/:_id", { preValidation: server.authAdmin }, getTeacherByIdHandler)
    server.get("/teacher/paging", { preValidation: server.authAdmin }, getTeacherByPagingHandler)
    server.get("/teacher/myself", { preValidation: server.authAdmin }, getMySelfHandler)
    server.put("/teacher/update/:_id", { preValidation: server.authAdmin }, updateTeacherHandler)
    server.put("/teacher/update/password", { preValidation: server.authAdmin }, updatePasswordHandler)

    server.get("/teacher/logs", { preValidation: server.authAdmin }, getPagingLogsHandler)
    server.delete("/teacher/logs", { preValidation: server.authAdmin }, clearAllLogsHandler)

    server.get("/teacher/excel", getExelHandler)

}

export const teacherPlugin = fp(teacher);
