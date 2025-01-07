import axios from "axios";
import { Roles } from "../../common/constant/role";
import { jwtSign } from "../../common/middleware/authentication";
import { validateIt } from "../../common/validation/validate";

import { hasAccess } from "../service/role.service";
import { TeacherChangePasswordDto, TeacherDto, TeacherDtoGroup, TeacherGetDto } from "../../common/validation/dto/admin/teacher.dto";
import { clearAllLogsService, createExcel, createTeacherService, deleteTeacherService, getMyselfService, getPagingTeacherLogsService, getTeacherByIdService, getTeacherByPagingService, getTimeTableByTeacherIdService, loginTeacherService, updatePasswordService, updateTeacherService } from "../service/teacher.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { TimetableDto, TimetableDtoGroup } from "../../common/validation/dto/admin/timeTable.dto";

export async function createTeacherHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_CREATE);

    console.log(req.body)

    const data = await validateIt(req.body, TeacherDto, TeacherDtoGroup.CREATE)
    console.log("data: ",req.body)

    const result = await createTeacherService(data)
    reply.success(result._id)
}

export async function getTeacherByPagingHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, PagingDto, TeacherDtoGroup.PAGING)
    const result = await getTeacherByPagingService(data)
    reply.success(result)
}

export async function getTeacherByIdHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.params, TeacherDto, TeacherDtoGroup.GET_BY_ID)
    const result = await getTeacherByIdService(data._id)
    reply.success(result)
}


export async function updateTeacherHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, TeacherDto, TeacherDtoGroup.UPDATE)
    await getTeacherByIdService(data._id)

    console.log(data)

    const result = await updateTeacherService(data._id, data)
    reply.success(result)
}

export async function deleteTeacherHandler(req, reply) {
    const data = await validateIt(req.params, TeacherDto, TeacherDtoGroup.DELETE)
    const result = await deleteTeacherService(data._id)
    reply.success(result)
}

export async function getMySelfHandler(req, reply) {
    const id = (req.teacher._id).toString()
    const emp = await getMyselfService(id)
    reply.success(emp)
}
export async function getPagingLogsHandler(req, reply) {
    const investorId = (req.teacher._id).toString()
    const data = await validateIt(req.query, TeacherGetDto, TeacherDtoGroup.PAGING)
    const result = await getPagingTeacherLogsService(data, investorId)
    reply.success(result)
}
export async function clearAllLogsHandler(req, reply) {
    const investorId = (req.teacher._id).toString();
    const result = await clearAllLogsService(investorId)
    reply.success(result)
}


export async function updatePasswordHandler(req, reply) {
    req.body._id = (req.teacher._id).toString()
    const data = await validateIt(req.body, TeacherChangePasswordDto, TeacherDtoGroup.PASSWORD)
    console.log("data : ", data)
    const result = await updatePasswordService(data)
    reply.success(result)
}


///login
export async function loginTeacherHandler(req, reply) {
    const data = await validateIt(req.body, TeacherDto, TeacherDtoGroup.LOGIN)
    console.log(data)
    const teacher = await loginTeacherService(data)

    if (teacher.saveLogs == true) {
        const ip = await axios.get("https://api.ipify.org/?format=json")
        console.log("ip address : ", ip.data, new Date().toString())
        const logsEmp = { ip: ip.data.ip.toString(), time: new Date() }
        teacher.logs.push(logsEmp)
        teacher.save();
    }
    const token: any = await jwtSign(req, { phoneNumber: teacher.phoneNumber })
    const result: any = teacher.toObject()
    result.token = token
    reply.success(result)
}


export async function getExelHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const result = await createExcel()
    reply.success(result)
}






export async function getMyTimeTableHandler(req, reply) {
    req.query.teacherId = (req.teacher._id).toString()
    const data = await validateIt(req.query, TimetableDto, TimetableDtoGroup.MY_TABLE)
    console.log("data : ", data)
    const result = await getTimeTableByTeacherIdService(data.teacherId, data)
    reply.success(result)
}

