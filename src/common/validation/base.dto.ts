import { IsMongoId, IsOptional } from "class-validator";
import { DtoGroup } from "../constant/dto.group";

export class BaseDto {
    @IsOptional({ groups: [DtoGroup.UPDATE] })
    @IsMongoId({
        groups: [
            DtoGroup.GET_BY_ID,
            DtoGroup.UPDATE,
            DtoGroup.DELETE,
            DtoGroup.ACTIVATE,
            DtoGroup.PASSWORD
        ]
    })
    _id: string
}
