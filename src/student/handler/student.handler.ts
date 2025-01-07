import { validateIt } from "../../common/validation/validate";

import { StudentChangePasswordDto, StudentDto, StudentDtoGroup, StudentGetDto,  } from "../../common/validation/dto/admin/student.dto";
import { TimetableDto, TimetableDtoGroup } from "../../common/validation/dto/admin/timeTable.dto";
import { getMyselfStudentService, getStudentByIdService, getTimeTableByStudentIdService, loginStudentService, updatePasswordStudentService, updateStudentService } from "../service/student.service";
import { clearAllStudentLogsService, createAllStudentsExcel, getPagingStudentLogsService } from "../../admin/service/student.service";
import axios from "axios";
import { jwtSign } from "../../common/middleware/authentication";


///login
export async function loginStudentHandler(req, reply) {
    const data = await validateIt(req.body, StudentDto, StudentDtoGroup.LOGIN)
    console.log(data)
    const student = await loginStudentService(data)

    if (student.saveLogs == true) {
        const ip = await axios.get("https://api.ipify.org/?format=json")
        console.log("ip address : ", ip.data, new Date().toString())
        const logsEmp = { ip: ip.data.ip.toString(), time: new Date() }
        student.logs.push(logsEmp)
        student.save();
    }
    const token: any = await jwtSign(req, { phoneNumber: student.phoneNumber })
    const result: any = student.toObject()
    result.token = token
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


export async function updatePasswordStudentHandler(req, reply) {
    req.body._id = (req.student._id).toString()
    const data = await validateIt(req.body, StudentChangePasswordDto, StudentDtoGroup.PASSWORD)
    console.log("data : ", data)
    const result = await updatePasswordStudentService(data)
    reply.success(result)
}


export async function getMySelfStudentHandler(req, reply) {
    const id = (req.student._id).toString()
    const emp = await getMyselfStudentService(id)
    reply.success(emp)
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





export async function getStudentTimeTableHandler(req, reply) {
    const groups = (req.student.groups)
    console.log("data : ", groups)
    const data = await validateIt(req.query, TimetableDto, TimetableDtoGroup.MY_TABLE)
    console.log("data : ", data)
    const result = await getTimeTableByStudentIdService(groups, data)
    reply.success(result)
}
