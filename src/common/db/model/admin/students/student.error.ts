import { ErrorCodes } from "../../../../constant/error.codes";
import { BaseResponse } from "../../../../error/base.response";

export class StudentResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new StudentResponse(ErrorCodes.StudentAlreadyexists, "Student already exists", data)
    }

    static NotFound(data: any = null) {
        return new StudentResponse(ErrorCodes.StudentNotFound, "Student Not Found", data)
    }

    static InvalidPassword(data: any = null) {
        return new StudentResponse(ErrorCodes.StudentInvalidPassword, "Student invalid password", data)
    }
}

