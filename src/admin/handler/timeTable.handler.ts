import { validateIt } from "../../common/validation/validate";

import { PagingDto } from "../../common/validation/dto/paging.dto";
import { clearAllStudentLogsService, createAllStudentsExcel, createStudentService, deleteStudentService, getPagingStudentLogsService, getStudentByIdService, getStudentByPagingService, updateStudentService } from "../service/student.service";
// import { TimetableDto, TimetableDtoGroup } from "../../common/validation/dto/admin/group.dto";
import { createGroupService, deleteGroupService, getGroupByIdService, getGroupByPagingService, updateGroupService } from "../service/group.service";
import { TimetableDto, TimetableDtoGroup } from "../../common/validation/dto/admin/timeTable.dto";
import { createTimeTableService, deleteTimeTableService, getTimeTableByDateService, getTimeTableByIdService, getTimeTableByPagingService, updateTimeTableService } from "../service/timeTable.service";

export async function createTimeTableHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_CREATE);
    const data = await validateIt(req.body, TimetableDto, TimetableDtoGroup.CREATE)
    const result = await createTimeTableService(data)
    reply.success(result._id)
}

export async function getTimeTableByPagingHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, PagingDto, TimetableDtoGroup.PAGING)
    const result = await getTimeTableByPagingService(data)
    reply.success(result)
}

export async function getTimeTableByIdHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.params, TimetableDto, TimetableDtoGroup.GET_BY_ID)
    const result = await getTimeTableByIdService(data._id)
    reply.success(result)
}


export async function updateTimeTableHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, TimetableDto, TimetableDtoGroup.UPDATE)
    const result = await updateTimeTableService(data._id, data)
    reply.success(result)
}

export async function deleteTimeTableHandler(req, reply) {
    const data = await validateIt(req.params, TimetableDto, TimetableDtoGroup.DELETE)
    const result = await deleteTimeTableService(data._id)
    reply.success(result)
}


export async function getTimeTableByDateHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, TimetableDto, TimetableDtoGroup.TABLE_BY_DATE)
    const result = await getTimeTableByDateService(data.date)
    reply.success(result)
}


