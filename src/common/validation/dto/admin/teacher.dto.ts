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

export class TeacherDtoGroup extends DtoGroup {
    static UPDATE_MYSELF = "updateMyself";
}

export class TeacherGetDto extends PagingDto {}

// Kurslar DTO
class CourseDto {
    @IsMongoId({ groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE] })
    courseId: string;
}

// Guruhlar DTO
class GroupDto {
    @IsMongoId({ groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE] })
    groupId: string;
}

export class TeacherDto extends BaseDto {
    @Transform(({ value }) =>
        value ? "+" + value.replace(/[^0-9]/g, "") : value
    )
    @IsPhoneNumber(null, {
        groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE],
    })
    @IsOptional({ groups: [TeacherDtoGroup.UPDATE] })
    phoneNumber: string;

    @IsOptional({
        groups: [TeacherDtoGroup.UPDATE, TeacherDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            TeacherDtoGroup.CREATE,
            TeacherDtoGroup.UPDATE,
            TeacherDtoGroup.UPDATE_MYSELF,
        ],
    })
    firstName: string;

    @IsOptional({
        groups: [TeacherDtoGroup.UPDATE, TeacherDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            TeacherDtoGroup.CREATE,
            TeacherDtoGroup.UPDATE,
            TeacherDtoGroup.UPDATE_MYSELF,
        ],
    })
    lastName: string;

    // @IsOptional({ groups: [TeacherDtoGroup.UPDATE] })
    // @IsMongoId({ groups: [TeacherDtoGroup.CREATE,TeacherDtoGroup.UPDATE] })
    // roleId: string

    @IsOptional({
        groups: [TeacherDtoGroup.UPDATE_MYSELF, TeacherDtoGroup.UPDATE],
    })
    @IsString({
        groups: [
            TeacherDtoGroup.CREATE,
            TeacherDtoGroup.UPDATE_MYSELF,
            TeacherDtoGroup.UPDATE,
            TeacherDtoGroup.LOGIN,
        ],
    })
    login: string;

    @IsOptional({
        groups: [TeacherDtoGroup.UPDATE, TeacherDtoGroup.UPDATE_MYSELF],
    })
    @IsString({
        groups: [
            TeacherDtoGroup.CREATE,
            TeacherDtoGroup.LOGIN,
            TeacherDtoGroup.UPDATE,
            TeacherDtoGroup.UPDATE_MYSELF,
        ],
    })
    password: string;

    @IsOptional({ groups: [TeacherDtoGroup.UPDATE] })
    @IsArray({ groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE] })
    @ValidateNested({
        each: true,
        groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE],
    })
    @Type(() => CourseDto)
    courses: CourseDto[];

    @IsOptional({ groups: [TeacherDtoGroup.UPDATE] })
    @IsArray({ groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE] })
    @ValidateNested({
        each: true,
        groups: [TeacherDtoGroup.CREATE, TeacherDtoGroup.UPDATE],
    })
    @Type(() => GroupDto)
    groups: GroupDto[];

    @IsOptional({ groups: [TeacherDtoGroup.UPDATE_MYSELF] })
    @IsBoolean({ groups: [TeacherDtoGroup.UPDATE_MYSELF] })
    saveLogs: boolean;
}

export class TeacherChangePasswordDto extends BaseDto {
    @IsString({ groups: [TeacherDtoGroup.PASSWORD] })
    currentPassword: string;

    @IsString({ groups: [TeacherDtoGroup.PASSWORD] })
    newPassword: string;
}
