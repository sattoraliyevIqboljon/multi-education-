import { ErrorCodes } from "../../../../constant/error.codes";
import { BaseResponse } from "../../../../error/base.response";

export class CourseResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new CourseResponse(ErrorCodes.CourseAlreadyexists, "Course already exists", data)
    }

    static NotFound(data: any = null) {
        return new CourseResponse(ErrorCodes.CourseNotFound, "Course Not Found", data)
    }
}

