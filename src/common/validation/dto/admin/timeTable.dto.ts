import { Type } from "class-transformer";
import {
    IsMongoId,
    IsString,
    IsOptional,
    ValidateNested,
    IsArray,
} from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { PagingDto } from "../paging.dto";
import { BaseDto } from "../../base.dto";

export class TimetableDtoGroup extends DtoGroup {
    static MY_TABLE = "myTable";
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

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE,TimetableDtoGroup.MY_TABLE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE, TimetableDtoGroup.MY_TABLE] })
    teacherId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    startTime: string; // Boshlanish vaqti (masalan, 10:00)

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    endTime: string; // Tugash vaqti (masalan, 11:30)





    @IsOptional({ groups: [TimetableDtoGroup.MY_TABLE] })
    @IsString({ groups: [TimetableDtoGroup.MY_TABLE] })
    from: string;

    @IsOptional({ groups: [TimetableDtoGroup.MY_TABLE] })
    @IsString({ groups: [TimetableDtoGroup.MY_TABLE] })
    to: string; 
}
