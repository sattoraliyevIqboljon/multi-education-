import { Types } from "mongoose";
import {
    create,
    deleteOne,
    findById,
    getPaging,
    updateOneById,
} from "../../common/service/base.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { BaseResponse } from "../../common/error/base.response";
import { StudentResponse } from "../../common/db/model/admin/students/student.error";
import { GroupResponse } from "../../common/db/model/admin/group/group.error";
import { CourseDto } from "../../common/validation/dto/admin/course.dto";
import { CourseModel } from "../../common/db/model/admin/course/course.model";
import { CourseResponse } from "../../common/db/model/admin/course/course.error";

/**
 * course create  service
 */
export async function createCourseService(data: CourseDto) {
    try {
        console.log(data);
        return await create(CourseModel, data);
    } catch (e) {
        if (e.code == 11000)
            throw BaseResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw BaseResponse.UnknownError(e);
    }
}

/**
 * course get paging service
 */
export async function getCourseByPagingService(data: PagingDto) {
    try {
        let query: any;

        if (data.search) {
            query = {
                name: {
                    $regex: data.search,
                    $options: "i",
                },
            };
        }


        const course = await getPaging(CourseModel, data, query);
        return course;
    } catch (error) {
        console.log(error);
        throw CourseResponse.UnknownError(error);
    }
}

/**
 * course get by id  service
 */
export async function getCourseByIdService(_id) {
    try {
        const course = await findById(CourseModel, _id);
        if (!course) throw CourseResponse.NotFound(_id);
        return course;
    } catch (error) {
        console.log(error);
        throw CourseResponse.UnknownError(error);
    }
}

export async function updateCourseService(_id, data) {
    try {
        await getCourseByIdService(_id)
        const res = await updateOneById(CourseModel, _id, data);
        return res
    } catch (e) {
        if (e.code == 11000)
            throw CourseResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw CourseResponse.UnknownError(e);
    }
}

export async function deleteCourseService(groupId) {
    try {
        const res = await deleteOne(CourseModel, groupId);
        return res;
    } catch (error) {
        console.log(error);
        throw CourseResponse.UnknownError(error);
    }
}
