import { ErrorCodes } from "../../../../constant/error.codes";
import { BaseResponse } from "../../../../error/base.response";


export class RoleResponse extends BaseResponse {
    static NotFound(data: any = null) {
        return new RoleResponse(ErrorCodes.RoleNotFound, 'Role not found', data);
    }
    static AlreadyExists(data: any = null) {
        return new RoleResponse(ErrorCodes.RoleAlreadyExists, "Role already exists", data)
    }
    static NotEnoughPermission(data: any = null) {
        return new RoleResponse(ErrorCodes.NotEnoughPermission, "Not enought permission", data)
    }
}
