import { Transform, Type } from "class-transformer";
import {
    IsPhoneNumber,
    IsOptional,
    IsString,
    IsMongoId,
    IsDateString,
    IsBoolean,
    IsEmail,
    IsArray,
    ValidateNested,
} from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { BaseDto } from "../../base.dto";
import { PagingDto } from "../paging.dto";

export class StudentDtoGroup extends DtoGroup {
    static UPDATE_MYSELF = "updateMyself";
}

export class StudentGetDto extends PagingDto {}

// Kurslar DTO
 class CourseDto {
    @IsMongoId({ groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE] })
    courseId: string;
}

// Guruhlar DTO
 class GroupDto {
    @IsMongoId({ groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE] })
    groupId: string;
}

export class StudentDto extends BaseDto {
    @Transform(({ value }) =>
        value ? "+" + value.replace(/[^0-9]/g, "") : value
    )
    @IsPhoneNumber(null, {
        groups: [
            StudentDtoGroup.CREATE,
            StudentDtoGroup.UPDATE,
        ],
    })
    @IsOptional({ groups: [StudentDtoGroup.UPDATE] })
    phoneNumber: string;

    @IsOptional({
        groups: [StudentDtoGroup.UPDATE, StudentDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            StudentDtoGroup.CREATE,
            StudentDtoGroup.UPDATE,
            StudentDtoGroup.UPDATE_MYSELF,
        ],
    })
    firstName: string;

    @IsOptional({
        groups: [StudentDtoGroup.UPDATE, StudentDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            StudentDtoGroup.CREATE,
            StudentDtoGroup.UPDATE,
            StudentDtoGroup.UPDATE_MYSELF,
        ],
    })
    lastName: string;

    // @IsOptional({ groups: [StudentDtoGroup.UPDATE] })
    // @IsMongoId({ groups: [StudentDtoGroup.CREATE,StudentDtoGroup.UPDATE] })
    // roleId: string

    @IsOptional({ groups: [StudentDtoGroup.UPDATE_MYSELF] })
    @IsString({
        groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE_MYSELF],
    })
    login: string;

    @IsOptional({
        groups: [StudentDtoGroup.UPDATE, StudentDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            StudentDtoGroup.CREATE,
            StudentDtoGroup.LOGIN,
            StudentDtoGroup.UPDATE,
            StudentDtoGroup.UPDATE_MYSELF
        ],
    })
    password: string;

    @IsOptional({ groups: [StudentDtoGroup.UPDATE] })
    @IsArray({ groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE] })
    @ValidateNested({
        each: true,
        groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE],
    })
    @Type(() => CourseDto)
    courses: CourseDto[];

    @IsOptional({ groups: [StudentDtoGroup.UPDATE] })
    @IsArray({ groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE] })
    @ValidateNested({
        each: true,
        groups: [StudentDtoGroup.CREATE, StudentDtoGroup.UPDATE],
    })
    @Type(() => GroupDto)
    groups: GroupDto[];

    @IsOptional({ groups: [StudentDtoGroup.UPDATE_MYSELF] })
    @IsBoolean({ groups: [StudentDtoGroup.UPDATE_MYSELF] })
    saveLogs: boolean;
}

export class TeacherChangePasswordDto extends BaseDto {
    @IsString({ groups: [StudentDtoGroup.PASSWORD] })
    currentPassword: string;

    @IsString({ groups: [StudentDtoGroup.PASSWORD] })
    newPassword: string;
}
