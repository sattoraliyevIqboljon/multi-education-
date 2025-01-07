import { validateIt } from "../../common/validation/validate";

import { PagingDto } from "../../common/validation/dto/paging.dto";
import { clearAllStudentLogsService, createAllStudentsExcel, createStudentService, deleteStudentService, getPagingStudentLogsService, getStudentByIdService, getStudentByPagingService, updateStudentService } from "../service/student.service";
import { GroupDto, GroupDtoGroup } from "../../common/validation/dto/admin/group.dto";
import { createGroupService, deleteGroupService, getGroupByIdService, getGroupByPagingService, updateGroupService } from "../service/group.service";

export async function createGroupHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_CREATE);

    const data = await validateIt(req.body, GroupDto, GroupDtoGroup.CREATE)
    const result = await createGroupService(data)
    reply.success(result._id)
}

export async function getGroupByPagingHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, PagingDto, GroupDtoGroup.PAGING)
    const result = await getGroupByPagingService(data)
    reply.success(result)
}

export async function getGroupByIdHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.params, GroupDto, GroupDtoGroup.GET_BY_ID)
    const result = await getGroupByIdService(data._id)
    reply.success(result)
}


export async function updateGroupHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, GroupDto, GroupDtoGroup.UPDATE)
    const result = await updateGroupService(data._id, data)
    reply.success(result)
}

export async function deleteGroupHandler(req, reply) {
    const data = await validateIt(req.params, GroupDto, GroupDtoGroup.DELETE)
    const result = await deleteGroupService(data._id)
    reply.success(result)
}
