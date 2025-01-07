import fp from "fastify-plugin";
import { authToken } from "../../common/middleware/authentication";
import { getStudentByPhoneNumberService } from "../service/student.service";
import { StudentResponse } from "../../common/db/model/admin/students/student.error";

async function autheticateStudent(req, reply) {
    try {
        await authToken(req, reply);

        if (!req.user) throw new Error();

        const { phoneNumber } = req.user;

        const student = await getStudentByPhoneNumberService(phoneNumber); ///funtion;;
        if (!student) throw StudentResponse.NotFound(phoneNumber);
        req.student = student;
    } catch (e) {
        console.log(e);
        return reply.status(401).send({
            ...e,
            code: 401,
            message: "Unauthorized",
            statusCode: 401,
        })
    }
}

async function plugin(server, options) {
    server.decorate("authAdmin", autheticateStudent);
}

export const authStudentPlugin = fp(plugin);
