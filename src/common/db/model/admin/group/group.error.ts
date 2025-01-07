import { ErrorCodes } from "../../../../constant/error.codes";
import { BaseResponse } from "../../../../error/base.response";

export class GroupResponse extends BaseResponse {
    static AlreadyExists(data: any = null) {
        return new GroupResponse(ErrorCodes.GroupAlreadyexists, "Group already exists", data)
    }

    static NotFound(data: any = null) {
        return new GroupResponse(ErrorCodes.GroupNotFound, "Group Not Found", data)
    }
}

