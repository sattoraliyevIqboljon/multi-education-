import { ClassConstructor, classToClassFromExist, plainToClass, plainToClassFromExist } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { BaseResponse } from "../error/base.response";


export const validateIt = async <T>(data: any, classType: ClassConstructor<T>, groups) => {
    if (!data) throw BaseResponse.ValidationError(null);

    const classData = plainToClass(classType, data as T, {
        excludeExtraneousValues: false,
        enableCircularCheck: true
    });

    const errors = await validate(classData as any, { groups, whitelist: true });
    if (!errors || errors.length === 0) return classData;

    throw BaseResponse.ValidationError(convertError(errors));
};

const convertError = (errors?: ValidationError[]) => {
    if (!errors || errors.length == 0) return [];

    return errors.map((item) => {
        return {
            constraints: convertConstraints(item.constraints),
            contexts: convertConstraints(item.contexts),
            property: item.property,
            children: convertError(item.children),
        };
    });
};

const convertConstraints = (data) => {
    if (!data) return [];
    return Object.keys(data).map((key) => {
        return {
            key: key,
            value: data[key],
        };
    });
};
