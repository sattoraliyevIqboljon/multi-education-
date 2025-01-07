import fp from "fastify-plugin";
import { authToken } from "../../common/middleware/authentication";
import { getTeacherByPhoneNumberService } from "../service/teacher.service";
import { TeacherResponse } from "../../common/db/model/admin/teacher/teacher.error";

async function autheticateAdmin(req, reply) {
    try {
        await authToken(req, reply);

        if (!req.user) throw new Error();

        const { phoneNumber } = req.user;

        const teacher = await getTeacherByPhoneNumberService(phoneNumber); ///funtion;;
        if (!teacher) throw TeacherResponse.NotFound(phoneNumber);
        req.teacher = teacher;
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
    server.decorate("authAdmin", autheticateAdmin);
}

export const authAdminPlugin = fp(plugin);
