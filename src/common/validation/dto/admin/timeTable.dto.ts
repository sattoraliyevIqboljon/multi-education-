import { Type } from "class-transformer";
import {
    IsMongoId,
    IsString,
    IsOptional,
} from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { PagingDto } from "../paging.dto";
import { BaseDto } from "../../base.dto";

export class TimetableDtoGroup extends DtoGroup {
    static UPDATE_MYSELF = "updateMyself";
}

export class TimetableGetDto extends PagingDto {}

// Guruh uchun asosiy DTO
export class TimetableDto extends BaseDto {
    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    date: string; // YYYY-MM-DD formatida saqlanadi

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    groupId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    courseId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    teacherId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    startTime: string; // Boshlanish vaqti (masalan, 10:00)

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    endTime: string; // Tugash vaqti (masalan, 11:30)
}
