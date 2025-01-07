import { RoleResponse } from "../../common/db/model/admin/role/role.error";
import { Role, RoleModel } from "../../common/db/model/admin/role/role.model";
import { create, findById, getPaging, updateOneById } from "../../common/service/base.service";
import { RoleDto, RoleGetDto } from "../../common/validation/dto/admin/role.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";

export async function createRoleService(data: RoleDto) {
    try {
        return await create(RoleModel, data)
    } catch (e) {
        if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
        else throw RoleResponse.UnknownError(e)
    }
}

export async function getRoleByIdService(id) {
    const role = await findById(RoleModel, id)
    if (!role) throw RoleResponse.NotFound(id)

    return role;
}

export async function getRoleByPagingService(data: RoleGetDto) {
    const $project = {
        $project: {
            isDeleted: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0
        }
    }

    const $pipeline = [$project]

    const roles = await getPaging(RoleModel, data)

    return roles;
}

export async function updateRoleService(id, data) {
    try {
        const role = await updateOneById(RoleModel, id, data);
        return role
    } catch (e) {
        if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
        throw RoleResponse.UnknownError(e);
    }
}


export async function hasAccess(id, access: string) {
    try {
        const role = await findById(RoleModel, id)
        if (!role[access] || role.isDeleted) throw new Error()
    } catch (e) {
        throw RoleResponse.NotEnoughPermission(e)
    }
}
