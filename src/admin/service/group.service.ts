import { Types } from "mongoose";
import {
    create,
    deleteOne,
    findById,
    getPaging,
    updateOneById,
} from "../../common/service/base.service";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { BaseResponse } from "../../common/error/base.response";
import { StudentResponse } from "../../common/db/model/admin/students/student.error";
import { StudentDto } from "../../common/validation/dto/admin/student.dto";
import { GroupModel } from "../../common/db/model/admin/group/group.model";
import { GroupResponse } from "../../common/db/model/admin/group/group.error";
import { GroupDto } from "../../common/validation/dto/admin/group.dto";

/**
 * group create  service
 */
export async function createGroupService(data: GroupDto) {
    try {
      
        console.log("group create :  ", data);


        return await create(GroupModel, data);
    } catch (e) {
        if (e.code == 11000)
            throw BaseResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw BaseResponse.UnknownError(e);
    }
}

/**
 * group get paging service
 */
export async function getGroupByPagingService(data: PagingDto) {
    try {
        let query: any;

        if (data.search) {
            query = {
                name: {
                    $regex: data.search,
                    $options: "i",
                },
            };
        }


        const student = await getPaging(GroupModel, data, query);
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

/**
 * group get by id  service
 */
export async function getGroupByIdService(_id) {
    try {
        const group = await findById(GroupModel, _id);
        if (!group) throw GroupResponse.NotFound(_id);
        return group;
    } catch (error) {
        console.log(error);
        throw GroupResponse.UnknownError(error);
    }
}

export async function updateGroupService(_id, data) {
    try {
        await getGroupByIdService(data._id)

        const res = await updateOneById(GroupModel, _id, data);
        return res
    } catch (e) {
        if (e.code == 11000)
            throw GroupResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw GroupResponse.UnknownError(e);
    }
}

export async function deleteGroupService(groupId) {
    try {
        const res = await deleteOne(GroupModel, groupId);
        return res;
    } catch (error) {
        console.log(error);
        throw GroupResponse.UnknownError(error);
    }
}
