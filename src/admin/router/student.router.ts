import fp from "fastify-plugin";
import { clearAllStudentLogsHandler, createStudentHandler, deleteStudentHandler, getPagingStudentLogsHandler, getStudentByIdHandler, getStudentByPagingHandler, getStudentExelHandler, updateStudentHandler } from "../handler/student.handler";

async function student(server, opt) {
    server.post("/student", { preValidation: server.authAdmin }, createStudentHandler)
    server.get("/student/:_id", { preValidation: server.authAdmin }, getStudentByIdHandler)
    server.get("/student/paging", { preValidation: server.authAdmin }, getStudentByPagingHandler)
    server.put("/student/:_id", { preValidation: server.authAdmin }, updateStudentHandler)
    server.delete("/student/:_id", { preValidation: server.authAdmin }, deleteStudentHandler)





    server.get("/student/logs", { preValidation: server.authAdmin }, getPagingStudentLogsHandler)
    server.delete("/student/logs", { preValidation: server.authAdmin }, clearAllStudentLogsHandler)

    server.get("/student/excel", getStudentExelHandler)
    

}

export const studentPlugin = fp(student);
