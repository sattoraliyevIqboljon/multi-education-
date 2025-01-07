import { Types } from "mongoose";
import ExcelJS from "exceljs";
import path from "path";
import { CollectionNames } from "../../common/constant/collections";
import {
    aggregate,
    create,
    findById,
    findByQuery,
    getPaging,
    updateOneById,
} from "../../common/service/base.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { BaseResponse } from "../../common/error/base.response";
import { StudentModel } from "../../common/db/model/admin/students/students.model";
import { StudentResponse } from "../../common/db/model/admin/students/student.error";
import { StudentDto } from "../../common/validation/dto/admin/student.dto";
import { TimetableModel } from "../../common/db/model/admin/timeTable/timeTable.model";



export async function getStudentByIdService(_id) {
    try {
        const student = await findById(StudentModel, _id);
        if (!student) throw StudentResponse.NotFound(_id);
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

/**
 * student  get my self  service
 */
export async function getMyselfStudentService(id) {
    try {
        const student = await getStudentByIdService(id);
        if (!student) throw StudentResponse.NotFound(id);

        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

export async function getStudentByPhoneNumberService(phoneNumber) {
    try {
        const student = await findByQuery(StudentModel, {
            phoneNumber: phoneNumber,
        });
        if (!student) throw StudentResponse.NotFound(phoneNumber);
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

export async function loginStudentService(data) {
    try {
        console.log(data)
        const student = await findByQuery(StudentModel, {
            login: data.login,
        });

        if (!student) throw StudentResponse.NotFound(data.login);
        if (data.password != student.password)
            throw StudentResponse.InvalidPassword(data.password);
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

export async function updatePasswordStudentService(data) {
    try {
        const student = await getStudentByIdService(data._id);
        if (data.currentPassword !== student.password) {
            throw StudentResponse.InvalidPassword(data.currentPassword);
        }
        return await updateStudentService(data._id, {
            password: data.newPassword,
        });
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

export async function updateStudentService(_id, data) {
    try {
        return await updateOneById(StudentModel, _id, data);
    } catch (e) {
        if (e.code == 11000)
            throw StudentResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw StudentResponse.UnknownError(e);
    }
}



export async function getTimeTableByStudentIdService(
    groups:[],
    data
) {
    try {
        if (!data.from || !data.to) {
            // Sana diapazonlarini hisoblash
            const getFormattedDate = (date) => date.toISOString().split('T')[0];
        
            const today = new Date(); // Bugungi sana
            const sevenDaysAgo = new Date(); // 7 kun oldingi sana
            sevenDaysAgo.setDate(today.getDate() - 6);
        
            // yyyy-mm-dd formatida olish
            data.from = getFormattedDate(sevenDaysAgo);
            data.to = getFormattedDate(today);
        }
        console.log(data)


        
        const $match = {
            $match: {
                $and: [
                    { groupId: { $in: groups.map(id => new Types.ObjectId(id)) } }, // groupId massiviga moslash
                    { date: { $gte: data.from } },
                    { date: { $lte: data.to  } },
                ],
            },
        };

        const $projectTeacher = {
            $project: {
                firstName: 1,
                lastName: 1,
            },
        };

        const $lookupTeacher = {
            $lookup: {
                from: CollectionNames.TEACHER,
                localField: "teacherId",
                foreignField: "_id",
                pipeline: [$projectTeacher],
                as: "teacher",
            },
        };

        const $unwindTeacher = {
            $unwind: {
                path: "$teacher",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projectGroup = {
            $project: {
                name: 1,
                description: 1,
            },
        };

        const $lookupGroup = {
            $lookup: {
                from: CollectionNames.GROUP,
                localField: "groupId",
                foreignField: "_id",
                pipeline: [$projectGroup],
                as: "group",
            },
        };

        const $unwindGroup = {
            $unwind: {
                path: "$group",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $projectCourse = {
            $project: {
                title: 1,
                description: 1,
            },
        };

        const $lookupCourse = {
            $lookup: {
                from: CollectionNames.COURSE,
                localField: "courseId",
                foreignField: "_id",
                pipeline: [$projectCourse],
                as: "course",
            },
        };

        const $unwindCourse = {
            $unwind: {
                path: "$course",
                preserveNullAndEmptyArrays: true,
            },
        };

        const $project = {
            $project: {
                date: 1,
                startTime: 1,
                endTime: 1,
                teacher: "$teacher",
                course: "$course",
                group: "$group",
            },
        };
        const $pipeline = [
            $match,
            $lookupTeacher,
            $unwindTeacher,
            $lookupGroup,
            $unwindGroup,
            $lookupCourse,
            $unwindCourse,
            $project,
        ];

        const table = await aggregate(TimetableModel, $pipeline);
        if (!table) throw BaseResponse.NotFound(data);
        return table;
    } catch (error) {
        console.log(error);
        throw BaseResponse.UnknownError(error);
    }
}
