import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constant/collections";
import { Student } from "../students/students.model";
import { BaseModel, Logs } from "../../base.model";
import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { Group } from "../group/group.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.TEACHER
    }
})


@index({
    phoneNumber: 1
},
    {
        unique: true,
        background: true,
        name: "phoneNumber",
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }

    }
)



export class Teacher extends BaseModel {
    @prop({ required: true })
    phoneNumber: string

    @prop({ required: true })
    firstName: string

    @prop({ required: true })
    lastName: string

    @prop({ required: true,  unique: true })
    login: string
    
    @prop({ required: true, trim: true })
    password: string

    // @prop({ type: Types.ObjectId, required: true, ref: CollectionNames.ROLE })
    // roleId: Ref<Role>

    

    @prop({ type: () => [Types.ObjectId], ref: CollectionNames.COURSE })
    courses: Ref<Course>[];

  
    @prop({ type: () => [Types.ObjectId], ref: CollectionNames.GROUP })
    groups: Ref<Group>[];

    // @prop({ default: null })
    // email: string



    @prop({ default: true })
    saveLogs: boolean



    @prop({ type: () => Logs })
    logs: Logs[]
}
// export class Teacher extends Student {

// }

export const TeacherModel = getModelForClass(Teacher)
