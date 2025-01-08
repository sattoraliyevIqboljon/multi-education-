import { Types } from "mongoose";
import ExcelJS from "exceljs";
import path from "path";
import { CollectionNames } from "../../common/constant/collections";
import {
    aggregate,
    create,
    deleteOne,
    findById,
    findByQuery,
    getPaging,
    updateOneById,
} from "../../common/service/base.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { TeacherModel } from "../../common/db/model/admin/teacher/teacher.model";
import { TeacherResponse } from "../../common/db/model/admin/teacher/teacher.error";
import { TeacherDto } from "../../common/validation/dto/admin/teacher.dto";
import { BaseResponse } from "../../common/error/base.response";
import { TimetableModel } from "../../common/db/model/admin/timeTable/timeTable.model";

/**
 * teacher create  service
 */
export async function createTeacherService(data: TeacherDto) {
    try {
        // function dtoToModel(data: TeacherDto) {
        //     return {
        //         ...data, // DTOning boshqa maydonlarini nusxalash
        //             // courses: data.courses.map(
        //             //     (course) => new Types.ObjectId(course.courseId) // courseId ni ObjectId ga o‘tkazish
        //             // ),
        //         groups: data.groups.map(
        //             (group) => new Types.ObjectId(group.groupId) // groupId ni ObjectId ga o‘tkazish
        //         ),
        //     };
        // }

        console.log("teacher create :  ", data);

        // const resData = dtoToModel(data);
        // console.log("teacher create 2 :  ", resData);

        return await create(TeacherModel, data);
    } catch (e) {
        if (e.code == 11000)
            throw TeacherResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw TeacherResponse.UnknownError(e);
    }
}

/**
 * teacher get paging service
 */
export async function getTeacherByPagingService(data: PagingDto) {
    try {
        let query: any;

        if (data.search) {
            query = {
                $or: [
                    {
                        firstName: {
                            $regex: data.search,
                            $options: "i",
                        },
                    },
                    {
                        lastName: {
                            $regex: data.search,
                            $options: "i",
                        },
                    },
                ],
            };
        }
        const $project = {
            $project: {
                password: 0,
                login: 0,
            },
        };
        const $pipeline = [$project];

        const teacher = await getPaging(
            TeacherModel,
            data,
            query,
            { createdAt: 1 },
            $pipeline
        );
        return teacher;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

/**
 * teacher get by id  service
 */
export async function getTeacherByIdService(_id) {
    try {
        const teacher = await findById(TeacherModel, _id);
        if (!teacher) throw TeacherResponse.NotFound(_id);
        return teacher;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

/**
 * teacher  get my self  service
 */
export async function getMyselfService(id) {
    try {
        const teacher = await getTeacherByIdService(id);
        if (!teacher) throw TeacherResponse.NotFound(id);

        return teacher;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

export async function getTeacherByPhoneNumberService(phoneNumber) {
    try {
        const teacher = await findByQuery(TeacherModel, {
            phoneNumber: phoneNumber,
        });
        if (!teacher) throw TeacherResponse.NotFound(phoneNumber);
        return teacher;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

export async function loginTeacherService(data) {
    try {
        const teacher = await findByQuery(TeacherModel, {
            login: data.login,
        });

        if (!teacher) throw TeacherResponse.NotFound(data.login);
        if (data.password != teacher.password)
            throw TeacherResponse.InvalidPassword(data.password);
        return teacher;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

export async function updatePasswordService(data) {
    try {
        const emp = await getTeacherByIdService(data._id);
        if (data.currentPassword !== emp.password) {
            throw TeacherResponse.InvalidPassword(data.currentPassword);
        }
        return await updateTeacherService(data._id, {
            password: data.newPassword,
        });
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

export async function updateTeacherService(_id, data) {
    try {
        return await updateOneById(TeacherModel, _id, data);
    } catch (e) {
        if (e.code == 11000)
            throw TeacherResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw TeacherResponse.UnknownError(e);
    }
}

export async function deleteTeacherService(teacherId) {
    try {
        const res = await deleteOne(TeacherModel, teacherId);
        return res;
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

export async function getPagingTeacherLogsService(data, teacherId) {
    const $match = {
        $match: {
            _id: new Types.ObjectId(teacherId),
        },
    };
    const $unwind = {
        $unwind: {
            path: "$logs",
        },
    };
    const $skip = {
        $skip: data.limit * (data.page - 1),
    };
    const $limit = {
        $limit: data.limit,
    };
    const $project = {
        $project: {
            logs: 1,
        },
    };
    const $pipeline = [$match, $unwind, $skip, $limit, $project];
    return await aggregate(TeacherModel, $pipeline);
}
export async function clearAllLogsService(teacherId) {
    const emp = await getTeacherByIdService(teacherId);
    emp.logs = [];
    emp.save();
    return "success";
}

export async function getAllTeacherService() {
    try {
        const $match = {
            $match: {
                isDeleted: false,
            },
        };
        const $lookup = {
            $lookup: {
                from: CollectionNames.ROLE,
                localField: "roleId",
                foreignField: "_id",
                as: "role",
            },
        };
        const $unwind = {
            $unwind: "$role",
        };
        const $pipeline = [
            $match,
            // $lookup,
            //  $unwind
        ];
        return await aggregate(TeacherModel, $pipeline);
    } catch (error) {
        console.log(error);
        throw TeacherResponse.UnknownError(error);
    }
}

/**
 * teachers Excel  table
 */
export async function createExcel() {
    try {
        const users = await getAllTeacherService();

        const columns = [
            { name: "firstName.", innerWidth: 10000 },
            { name: "lastName.", innerWidth: 10000 },
            { name: "PhoneNumber.", innerWidth: 100 },
            { name: "login.", innerWidth: 100 },
            { name: "Password.", innerWidth: 100 },
        ];

        const usersRow = users.map((u) => [
            u.firstName,
            u.lastName,
            u.phoneNumber,
            u.login,
            u.password,
        ]);

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet("excelSheet");
        // excel
        worksheet.addTable({
            name: "Teachers",
            ref: "A1",
            columns: columns,
            rows: usersRow,
        });

        const filename = `emp-${new Date().getTime()}.xlsx`;

        const file = `../../../../uploads/excel/${filename}`;
        const localPath = path.join(__dirname, file);
        await workbook.xlsx.writeFile(localPath);
        return `/excel/${filename}`;
    } catch (error) {
        console.log(error);
        throw BaseResponse.UnknownError(error);
    }
}

export async function getTimeTableByTeacherIdService(
    teacherId: string,
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

        
        const $match = {
            $match: {
                $and: [
                    { teacherId: new Types.ObjectId(teacherId) },
                    { endTime: { $gte: data.from } },
                    { startTime: { $lte: data.to  } },
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
                // date: 1,
                weekdays:1,
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
