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
import { BaseResponse } from "../../common/error/base.response";
import { StudentModel } from "../../common/db/model/admin/students/students.model";
import { StudentResponse } from "../../common/db/model/admin/students/student.error";
import { StudentDto } from "../../common/validation/dto/admin/student.dto";
import { TimetableModel } from "../../common/db/model/admin/timeTable/timeTable.model";

/**
 * student create  service
 */
export async function createStudentService(data: StudentDto) {
    try {
        function dtoToModel(data: StudentDto) {
            return {
                ...data, // DTOning boshqa maydonlarini nusxalash
                courses: data.courses.map(
                    (course) => new Types.ObjectId(course.courseId) // courseId ni ObjectId ga o‘tkazish
                ),
                groups: data.groups.map(
                    (group) => new Types.ObjectId(group.groupId) // groupId ni ObjectId ga o‘tkazish
                ),
            };
        }
        console.log("student create :  ", data);

        const resData = dtoToModel(data)
                return await create(StudentModel, resData);
    } catch (e) {
        if (e.code == 11000)
            throw StudentResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw StudentResponse.UnknownError(e);
    }
}

/**
 * student get paging service
 */
export async function getStudentByPagingService(data: PagingDto) {
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

        const student = await getPaging(
            StudentModel,
            data,
            query,
            {createdAt:1},
            $pipeline
        );
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

/**
 * student get by id  service
 */
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
// export async function getMyselfStudentService(id) {
//     try {
//         const student = await getStudentByIdService(id);
//         if (!student) throw StudentResponse.NotFound(id);

//         return student;
//     } catch (error) {
//         console.log(error);
//         throw StudentResponse.UnknownError(error);
//     }
// }

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

// export async function loginStudentService(data) {
//     try {
//         const student = await findByQuery(StudentModel, {
//             login: data.login,
//         });

//         if (!student) throw StudentResponse.NotFound(data.login);
//         if (data.password != student.password)
//             throw StudentResponse.InvalidPassword(data.password);
//         return student;
//     } catch (error) {
//         console.log(error);
//         throw StudentResponse.UnknownError(error);
//     }
// }

// export async function updatePasswordService(data) {
//     try {
//         const student = await getStudentByIdService(data._id);
//         if (data.currentPassword !== student.password) {
//             throw StudentResponse.InvalidPassword(data.currentPassword);
//         }
//         return await updateStudentService(data._id, {
//             password: data.newPassword,
//         });
//     } catch (error) {
//         console.log(error);
//         throw StudentResponse.UnknownError(error);
//     }
// }

export async function updateStudentService(_id, data) {
    try {
        return await updateOneById(StudentModel, _id, data);
    } catch (e) {
        if (e.code == 11000)
            throw StudentResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw StudentResponse.UnknownError(e);
    }
}

export async function deleteStudentService(studentId) {
   try {
    const res = await deleteOne(StudentModel,  studentId);
    return res;
   } catch (error) {
    
    console.log(error);
    throw StudentResponse.UnknownError(error);
   }
}



export async function getPagingStudentLogsService(data, teacherId) {
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
    return await aggregate(StudentModel, $pipeline);
}
export async function clearAllStudentLogsService(teacherId) {
    const emp = await getStudentByIdService(teacherId);
    emp.logs = [];
    emp.save();
    return "success";
}

export async function getAllStudentService() {
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
        return await aggregate(StudentModel, $pipeline);
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

/**
 * student Excel  table
 */
export async function createAllStudentsExcel() {
    try {
        const users = await getAllStudentService();

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




