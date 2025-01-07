import { validateIt } from "../../common/validation/validate";

import { PagingDto } from "../../common/validation/dto/paging.dto";
import { clearAllStudentLogsService, createAllStudentsExcel, createStudentService, deleteStudentService, getPagingStudentLogsService, getStudentByIdService, getStudentByPagingService, updateStudentService } from "../service/student.service";
import { StudentDto, StudentDtoGroup, StudentGetDto,  } from "../../common/validation/dto/admin/student.dto";

export async function createStudentHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_CREATE);

    const data = await validateIt(req.body, StudentDto, StudentDtoGroup.CREATE)
    const result = await createStudentService(data)
    reply.success(result._id)
}

export async function getStudentByPagingHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, PagingDto, StudentDtoGroup.PAGING)
    const result = await getStudentByPagingService(data)
    reply.success(result)
}

export async function getStudentByIdHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.params, StudentDto, StudentDtoGroup.GET_BY_ID)
    const result = await getStudentByIdService(data._id)
    reply.success(result)
}


export async function updateStudentHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, StudentDto, StudentDtoGroup.UPDATE)
    await getStudentByIdService(data._id)
    const result = await updateStudentService(data._id, data)
    reply.success(result)
}

export async function deleteStudentHandler(req, reply) {
    const data = await validateIt(req.params, StudentDto, StudentDtoGroup.DELETE)
    const result = await deleteStudentService(data._id)
    reply.success(result)
}

export async function getPagingStudentLogsHandler(req, reply) {
    const investorId = (req.student._id).toString()
    const data = await validateIt(req.query, StudentGetDto, StudentDtoGroup.PAGING)
    const result = await getPagingStudentLogsService(data, investorId)
    reply.success(result)
}
export async function clearAllStudentLogsHandler(req, reply) {
    const investorId = (req.student._id).toString();
    const result = await clearAllStudentLogsService(investorId)
    reply.success(result)
}

export async function getStudentExelHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const result = await createAllStudentsExcel()
    reply.success(result)
}




