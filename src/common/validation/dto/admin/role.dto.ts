import { IsBoolean, IsOptional, IsString } from "class-validator";
import { DtoGroup } from "../../../constant/dto.group";
import { BaseDto } from "../../base.dto";
import { PagingDto } from "../paging.dto";

export class RoleDtoGroup extends DtoGroup { }
export class RoleGetDto extends PagingDto { }
export class RoleDto extends BaseDto {
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsString({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    name: string

    @IsOptional({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    @IsString({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    description: string


    /* ********************************** */
    //employee
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    employee: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    employeeCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    employeeUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    employeeDelete: boolean


    /* ********************************** */
    //role
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    role: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    roleCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    roleUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    roleDelete: boolean

    /* ********************************** */
    //investor
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investor: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investorUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investorDelete: boolean

    /* ********************************** */
    //investment
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investment: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentDelete: boolean

    /* ********************************** */
    //client
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    client: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    clientCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    clientUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    clientDelete: boolean

    /* ********************************** */
    //product
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    product: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    productCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    productUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    productDelete: boolean

    /* ********************************** */
    //trade
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    trade: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    tradeCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    tradeUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    tradeDelete: boolean

    /* ********************************** */
    //country
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    country: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    countryCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    countryUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    countryDelete: boolean

    /* ********************************** */
    //category
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    category: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    categoryCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    categoryUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    categoryDelete: boolean

    /* ********************************** */
    //deadline
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    deadline: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    deadlineCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    deadlineUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    deadlineDelete: boolean

    /* ********************************** */
    //investmentType
    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentType: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentTypeCreate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentTypeUpdate: boolean

    @IsOptional({ groups: [RoleDtoGroup.UPDATE] })
    @IsBoolean({ groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE] })
    investmentTypeDelete: boolean
}