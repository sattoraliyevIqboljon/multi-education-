import { Type } from "class-transformer";
import { IsMongoId, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { PagingDto } from "../paging.dto";
import { BaseDto } from "../../base.dto";


export class CourseDtoGroup extends DtoGroup {
    static UPDATE_MYSELF = "updateMyself";
}

export class CourseGetDto extends PagingDto {}


  
  // course uchun asosiy DTO
export class CourseDto extends BaseDto {
    @IsOptional({ groups: [ CourseDtoGroup.UPDATE] })
    @IsString({ groups: [CourseDtoGroup.CREATE, CourseDtoGroup.UPDATE] })
    title: string;
  
    @IsOptional({ groups: [CourseDtoGroup.CREATE, CourseDtoGroup.UPDATE] })
    @IsString({ groups: [CourseDtoGroup.CREATE, CourseDtoGroup.UPDATE] })
    description: string;
  
  }