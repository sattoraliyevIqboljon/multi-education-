
import { validateIt } from "../../common/validation/validate";

import { PagingDto } from "../../common/validation/dto/paging.dto";
import { createCourseService, deleteCourseService, getCourseByIdService, getCourseByPagingService, updateCourseService } from "../service/course.service";
import { CourseDto, CourseDtoGroup } from "../../common/validation/dto/admin/course.dto";

export async function createCourseHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_CREATE);

    const data = await validateIt(req.body, CourseDto, CourseDtoGroup.CREATE)
    const result = await createCourseService(data)
    reply.success(result._id)
}

export async function getCourseByPagingHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.query, PagingDto, CourseDtoGroup.PAGING)
    const result = await getCourseByPagingService(data)
    reply.success(result)
}

export async function getCourseByIdHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(req.params, CourseDto, CourseDtoGroup.GET_BY_ID)
    const result = await getCourseByIdService(data._id)
    reply.success(result)
}


export async function updateCourseHandler(req, reply) {
    // await hasAccess(req.employee.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt({ ...req.params, ...req.body }, CourseDto, CourseDtoGroup.UPDATE)
    const result = await updateCourseService(data._id, data)
    reply.success(result)
}

export async function deleteCourseHandler(req, reply) {
    const data = await validateIt(req.params, CourseDto, CourseDtoGroup.DELETE)
    const result = await deleteCourseService(data._id)
    reply.success(result)
}
