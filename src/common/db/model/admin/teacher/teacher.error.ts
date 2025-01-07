import { ErrorCodes } from "../../../../constant/error.codes";
import { BaseResponse } from "../../../../error/base.response";

export class TeacherResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new TeacherResponse(ErrorCodes.TeacherAlreadyexists, "Teacher already exists", data)
    }

    static NotFound(data: any = null) {
        return new TeacherResponse(ErrorCodes.TeacherNotFound, "Teacher Not Found", data)
    }

    static InvalidPassword(data: any = null) {
        return new TeacherResponse(ErrorCodes.TeacherInvalidPassword, "Teacher invalid password", data)
    }
}

