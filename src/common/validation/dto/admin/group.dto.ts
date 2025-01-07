import { Type } from "class-transformer";
import { IsMongoId, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { PagingDto } from "../paging.dto";
import { BaseDto } from "../../base.dto";


export class GroupDtoGroup extends DtoGroup {
    static UPDATE_MYSELF = "updateMyself";
}

export class GroupGetDto extends PagingDto {}

// Kurslar uchun DTO
 class CourseDto {
    @IsMongoId({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    courseId: string;
  }
  
  // Guruh uchun asosiy DTO
export class GroupDto extends BaseDto {
    @IsOptional({ groups: [ GroupDtoGroup.UPDATE] })
    @IsString({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    name: string;
  
    @IsOptional({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    @IsString({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    description: string;
  
    @IsOptional({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    @IsArray({ groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    @ValidateNested({ each: true, groups: [GroupDtoGroup.CREATE, GroupDtoGroup.UPDATE] })
    @Type(() => CourseDto)
    courses: CourseDto[];
  }