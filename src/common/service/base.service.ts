import { BeAnObject, ModelType } from "@typegoose/typegoose/lib/types";
import mongoose, { AggregateOptions, QueryOptions, SaveOptions } from "mongoose";
import { PagingDto } from "../validation/dto/paging.dto";
import { BaseResponse } from "../error/base.response";


///TRANSACTION
export async function withTransaction(callback) {
    try {
        let result;
        const session = await mongoose.startSession();

        await session.withTransaction(async () => {
            result = await callback(session)
        })

        await session.endSession();
        return result;
    }
    catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///AGGREGATE
export async function aggregate<T>(model: ModelType<T, BeAnObject>, pipeline: any) {
    try {
        return await model.aggregate(pipeline)
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///CREATE
export async function create<T>(model: ModelType<T, BeAnObject>, data, options?: SaveOptions) {
    try {
        return (await model.create([data], options)).shift();//shu joyda shift return yoq ed
    } catch (e) {
        console.log(e)
        throw e
    }
}

///FIND BY ID
export async function findById<T>(model: ModelType<T, BeAnObject>, _id: string, project = {}, options?: QueryOptions) {
    try {
        const query = { _id, isDeleted: false };
        const projection = { __v: 0, isDeleted: 0, ...project }
        return await model.findOne(query, projection, options)
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///FIND BY QUERY
export async function findByQuery<T>(model: ModelType<T, BeAnObject>, query, project = {}, options?: QueryOptions) {
    try {
        const projection = { __v: 0, isDeleted: 0, ...project }
        return await model.findOne(query, projection, options)
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///FIND BY PIPELINE
export async function findByPipeline<T>(model: ModelType<T, BeAnObject>, _id: string, pipeline: any[] = [], options?: AggregateOptions) {
    try {
        const baseQuery = {
            isDeleted: false,
            _id,
        };

        const $match = {
            $match: baseQuery
        }

        const $pipeline = [$match, ...pipeline]
        const data = await model.aggregate($pipeline, options)
        return data[0];
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///FIND BY PAGING
export async function getPaging<T>(model: ModelType<T, BeAnObject>, dto: PagingDto, query?: any, sort?: any, pipeline: any[] = []) {
    try {
        const baseQuery = {
            isDeleted: false,
            ...query
        }
        const $match = {
            $match: baseQuery
        }

        let $sort = {
            $sort: {
                _id: 1
            }
        }
        if (sort) {
            $sort.$sort = sort
        }

        const { page, limit } = dto;
        const total = await model.countDocuments(baseQuery)
        const $pipeline = [$match, $sort, ...pipeline]
        const data = await model
            .aggregate($pipeline)
            .skip(limit * (page - 1))
            .limit(limit)
            .project({ __v: 0, isDeleted: 0 })

        return {
            total,
            data
        }
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///COUNT
export async function count<T>(model: ModelType<T, BeAnObject>, query: Object) {
    try {
        const baseQuery = {
            isDeleted: false,
            ...query,
        }
        return await model.countDocuments(baseQuery)
    } catch (e) {
        console.log(e);
        throw BaseResponse.UnknownError(e)
    }
}

///UPDATE ONE BY ID
export async function updateOneById<T>(model: ModelType<T, BeAnObject>, _id: string, data) {
    try {
        return await model.updateOne({ _id }, data);
    } catch (e) {
        console.log(e);
        throw e
    }
}

///UPDATE ONE BY QUERY
export async function updateOneByQuery<T>(model: ModelType<T, BeAnObject>, query, data, options?: QueryOptions) {
    try {
        await model.findOneAndUpdate(query, data, { ...options, new: true });
        return
    } catch (e) {
        console.log(e);
        throw e
    }
}

///UPDATE MANY BY QUERY
export async function updateMany<T>(model: ModelType<T, BeAnObject>, query, data: object
) {
    try {
        await model.updateMany(query, data);
        return
    } catch (e) {
        console.log(e);
        throw BaseResponse.UnknownError(e)
    }
}

///DELETE
export async function deleteOne<T>(model: ModelType<T, BeAnObject>, _id) {
    try {
        return await model.deleteOne({ _id })
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}

///GET ALL /* custom */
export async function getAll<T>(model: ModelType<T, BeAnObject>, project = {}) {
    try {
        const query = { isDeleted: false }
        const projection = { __v: 0, isDeleted: 0, ...project }
        return await model.find(query, projection)
    } catch (e) {
        console.log(e)
        throw BaseResponse.UnknownError(e)
    }
}