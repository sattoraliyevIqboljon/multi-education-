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

export async function updatePasswordService(data) {
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