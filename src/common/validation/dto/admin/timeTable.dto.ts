import { Type } from "class-transformer";
import {
    IsMongoId,
    IsString,
    IsOptional,
    ValidateNested,
    IsArray,
    ArrayUnique,
    IsEnum,
} from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { PagingDto } from "../paging.dto";
import { BaseDto } from "../../base.dto";
import { Weekday } from "../../../constant/enum";

export class TimetableDtoGroup extends DtoGroup {
    static MY_TABLE = "myTable";
    static TABLE_BY_DATE = "tableByDate";

}

export class TimetableGetDto extends PagingDto {}

// Guruh uchun asosiy DTO
export class TimetableDto extends BaseDto {


    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    groupId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsMongoId({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    courseId: string;

    @IsOptional({
        groups: [TimetableDtoGroup.UPDATE, TimetableDtoGroup.MY_TABLE],
    })
    @IsMongoId({
        groups: [
            TimetableDtoGroup.CREATE,
            TimetableDtoGroup.UPDATE,
            TimetableDtoGroup.MY_TABLE,
        ],
    })
    teacherId: string;

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    startTime: string; // Boshlanish vaqti 

    @IsOptional({ groups: [TimetableDtoGroup.UPDATE] })
    @IsString({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    endTime: string; // Tugash vaqti 

    @IsOptional({groups: [TimetableDtoGroup.UPDATE]}) // Agar bu maydon majburiy bo'lmasa
    @IsArray({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] })
    @IsEnum(Weekday, {
        each: true,
        groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] 
    }) 
    // @ArrayUnique({ groups: [TimetableDtoGroup.CREATE, TimetableDtoGroup.UPDATE] }) // Dublikat qiymatlarni oldini olish
    weekdays: Weekday[];

    // @IsOptional({ groups: [TimetableDtoGroup.MY_TABLE] })
    @IsString({ groups: [ TimetableDtoGroup.TABLE_BY_DATE] })
    date: string; // YYYY-MM-DD formatida saqlanadi


    

    @IsOptional({ groups: [TimetableDtoGroup.MY_TABLE] })
    @IsString({ groups: [TimetableDtoGroup.MY_TABLE] })
    from: string;

    @IsOptional({ groups: [TimetableDtoGroup.MY_TABLE] })
    @IsString({ groups: [TimetableDtoGroup.MY_TABLE] })
    to: string;
}
