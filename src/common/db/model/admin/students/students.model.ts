import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../../../constant/collections";
import { BaseModel, Logs } from "../../base.model";
import { Course } from "../course/course.model";
import { Group } from "../group/group.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.STUDENT
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



export class Student extends BaseModel {
    
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


    @prop({ type: () => [Types.ObjectId], ref: CollectionNames.COURSE })
    courses: Ref<Course>[];

  
    @prop({ type: () => [Types.ObjectId], ref: CollectionNames.GROUP })
    groups: Ref<Group>[];





    @prop({ default: true })
    saveLogs: boolean


    @prop({ type: () => Logs })
    logs: Logs[]
}

export const StudentModel = getModelForClass(Student)
