import fp from "fastify-plugin";
import {
    clearAllStudentLogsHandler,
    getMySelfStudentHandler,
    getPagingStudentLogsHandler,
    getStudentByIdHandler,
    getStudentExelHandler,
    getStudentTimeTableHandler,
    loginStudentHandler,
    updatePasswordStudentHandler,
    updateStudentHandler,
} from "../handler/student.handler";

async function student(server, opt) {
    server.post("/student/login", loginStudentHandler);
    server.get("/student/:_id",{ preValidation: server.authAdmin }, getStudentByIdHandler);
    server.get("/student/myself",{ preValidation: server.authAdmin }, getMySelfStudentHandler);
    server.put("/student/:_id", { preValidation: server.authAdmin }, updateStudentHandler);
    server.put("/student/password",{ preValidation: server.authAdmin }, updatePasswordStudentHandler );
    server.get("/student/table",{ preValidation: server.authAdmin }, getStudentTimeTableHandler );


    server.get("/student/logs",{ preValidation: server.authAdmin },getPagingStudentLogsHandler);
    server.delete("/student/logs", { preValidation: server.authAdmin }, clearAllStudentLogsHandler);

    server.get("/student/excel", getStudentExelHandler);
}

export const studentPlugin = fp(student);
