import { DtoGroup } from "../../common/constant/dto.group";
import { Roles } from "../../common/constant/role";
import { RoleDto, RoleDtoGroup, RoleGetDto } from "../../common/validation/dto/admin/role.dto";
import { validateIt } from "../../common/validation/validate";
import { createRoleService, getRoleByIdService, getRoleByPagingService, hasAccess, updateRoleService } from "../service/role.service";

export async function createRoleHandler(req, reply) {
    await hasAccess(req.employee.roleId, Roles.ROLE_CREATE);

    const data = await validateIt(req.body, RoleDto, RoleDtoGroup.CREATE)
    const result = await createRoleService(data)
    reply.success(result._id)
}

export async function getPagingRoleHandler(req, reply) {
    await hasAccess(req.employee.roleId, Roles.ROLE);

    const data = await validateIt(req.query, RoleGetDto, RoleDtoGroup.PAGING)
    const result = await getRoleByPagingService(data)
    reply.success(result)
}

export async function getRoleByIdHandler(req, reply) {
    await hasAccess(req.employee.roleId, Roles.ROLE);

    const data = await validateIt(req.params, RoleDto, RoleDtoGroup.GET_BY_ID)
    const role = await getRoleByIdService(data._id)
    reply.success(role)
}

export async function updateRoleHandler(req, reply) {
    await hasAccess(req.employee.roleId, Roles.ROLE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, RoleDto, DtoGroup.UPDATE);
    await getRoleByIdService(data._id);
    const updateRole = await updateRoleService(data._id, data);
    reply.success();
}

