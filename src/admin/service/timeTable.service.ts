import { Types } from "mongoose";
import {
    aggregate,
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
import { GroupDto } from "../../common/validation/dto/admin/group.dto";
import { TimetableModel } from "../../common/db/model/admin/timeTable/timeTable.model";
import { CollectionNames } from "../../common/constant/collections";

/**
 * timetable create  service
 */
export async function createTimeTableService(data) {
    try {
        console.log("group create :  ", data);


        return await create(TimetableModel, data);
    } catch (e) {
        if (e.code == 11000)
            throw BaseResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw BaseResponse.UnknownError(e);
    }
}

/**
 * Timetable get paging service
 */
export async function getTimeTableByPagingService(data: PagingDto) {
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


        const $projectTeacher = {
            $project: {
              firstName: 1,
              lastName:1,
            }
          }
      
          const $lookupTeacher = {
            $lookup: {
              from: CollectionNames.TEACHER,
              localField: "teacherId",
              foreignField: "_id",
              pipeline: [
                $projectTeacher
              ],
              as: "teacher"
            }
          };
      
          const $unwindTeacher = {
            $unwind: {
              path: "$teacher",
              preserveNullAndEmptyArrays: true,
            }
          };




          const $projectGroup = {
            $project: {
              name: 1,
              description:1
            }
          }

          const $lookupGroup = {
            $lookup: {
              from: CollectionNames.GROUP,
              localField: "groupId",
              foreignField: "_id",
              pipeline: [
                $projectGroup
              ],
              as: "group"
            }
          };
      
          const $unwindGroup = {
            $unwind: {
              path: "$group",
              preserveNullAndEmptyArrays: true,
            }
          };  



          const $projectCourse = {
            $project: {
              name: 1,
              description:1
            }
          }

          const $lookupCourse = {
            $lookup: {
              from: CollectionNames.COURSE,
              localField: "courseId",
              foreignField: "_id",
              pipeline: [
                $projectCourse
              ],
              as: "course"
            }
          };
      
          const $unwindCourse = {
            $unwind: {
              path: "$course",
              preserveNullAndEmptyArrays: true,
            }
          }; 

          const $project={
            $project:{
                date:1,
                startTime:1,
                endTime:1,
                teacher:"$teacher",
                course:"$course",
                group:"$group"
            }
          }
          const $pipeline=[
            $lookupTeacher,
            $unwindTeacher,
            $lookupGroup,
            $unwindGroup,
            $lookupCourse,
            $unwindCourse,
            $project
          ]
          const sort={
            startTime:1
          }

        const student = await getPaging(TimetableModel, data, query,sort, $pipeline );
        return student;
    } catch (error) {
        console.log(error);
        throw StudentResponse.UnknownError(error);
    }
}

/**
 * group get by id  service
 */
export async function getTimeTableByIdService(_id) {
    try {
        const $match={
            $match:{
                _id: new Types.ObjectId((_id.toString()))
            }
        }

        const $projectTeacher = {
            $project: {
              firstName: 1,
              lastName:1,
            }
          }
      
          const $lookupTeacher = {
            $lookup: {
              from: CollectionNames.TEACHER,
              localField: "teacherId",
              foreignField: "_id",
              pipeline: [
                $projectTeacher
              ],
              as: "teacher"
            }
          };
      
          const $unwindTeacher = {
            $unwind: {
              path: "$teacher",
              preserveNullAndEmptyArrays: true,
            }
          };




          const $projectGroup = {
            $project: {
              name: 1,
              description:1
            }
          }

          const $lookupGroup = {
            $lookup: {
              from: CollectionNames.GROUP,
              localField: "groupId",
              foreignField: "_id",
              pipeline: [
                $projectGroup
              ],
              as: "group"
            }
          };
      
          const $unwindGroup = {
            $unwind: {
              path: "$group",
              preserveNullAndEmptyArrays: true,
            }
          };  



          const $projectCourse = {
            $project: {
              title: 1,
              description:1
            }
          }

          const $lookupCourse = {
            $lookup: {
              from: CollectionNames.COURSE,
              localField: "courseId",
              foreignField: "_id",
              pipeline: [
                $projectCourse
              ],
              as: "course"
            }
          };
      
          const $unwindCourse = {
            $unwind: {
              path: "$course",
              preserveNullAndEmptyArrays: true,
            }
          }; 

          const $project={
            $project:{
                date:1,
                startTime:1,
                endTime:1,
                teacher:"$teacher",
                course:"$course",
                group:"$group"
            }
          }
          const $pipeline=[
            $match,
            $lookupTeacher,
            $unwindTeacher,
            $lookupGroup,
            $unwindGroup,
            $lookupCourse,
            $unwindCourse,
            $project
          ]

        const table = await aggregate(TimetableModel, $pipeline);
        if (!table) throw BaseResponse.NotFound(_id);
        return table;
    } catch (error) {
        console.log(error);
        throw BaseResponse.UnknownError(error);
    }
}

export async function updateTimeTableService(_id, data) {
    try {
        await getTimeTableByIdService(data._id)

        const res = await updateOneById(TimetableModel, _id, data);
        return res
    } catch (e) {
        if (e.code == 11000)
            throw BaseResponse.AlreadyExists(Object.keys(e.keyPattern));
        else throw BaseResponse.UnknownError(e);
    }
}

export async function deleteTimeTableService(tableId) {
    try {
        const res = await deleteOne(TimetableModel, tableId);
        return res;
    } catch (error) {
        console.log(error);
        throw BaseResponse.UnknownError(error);
    }
}
