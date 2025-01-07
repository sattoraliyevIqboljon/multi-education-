import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.ROLE
    }
})


@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: "name",
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }

    }
)

export class Role extends BaseModel {
    @prop({ required: true, trim: true })
    name: string

    @prop({ trim: true, default: null })
    description: string


        
    //role
    @prop({ default: false })
    role: boolean

    @prop({ default: false })
    roleCreate: boolean

    @prop({ default: false })
    roleUpdate: boolean

    @prop({ default: false })
    roleDelete: boolean


    //teacher
    @prop({ default: false })
    teacher: boolean

    @prop({ default: false })
    teacherCreate: boolean

    @prop({ default: false })
    teacherUpdate: boolean

    @prop({ default: false })
    teacherDelete: boolean


    //student
    @prop({ default: false })
    student: boolean

    @prop({ default: false })
    studentCreate: boolean

    @prop({ default: false })
    studentUpdate: boolean

    @prop({ default: false })
    studentDelete: boolean


    //group
    @prop({ default: false })
    group: boolean

    @prop({ default: false })
    groupCreate: boolean

    @prop({ default: false })
    groupUpdate: boolean

    @prop({ default: false })
    groupDelete: boolean


    //course
    @prop({ default: false })
    course: boolean

    @prop({ default: false })
    courseCreate: boolean

    @prop({ default: false })
    courseUpdate: boolean

    @prop({ default: false })
    courseDelete: boolean



    //deadline
    @prop({ default: false })
    deadline: boolean

    @prop({ default: false })
    deadlineCreate: boolean

    @prop({ default: false })
    deadlineUpdate: boolean

    @prop({ default: false })
    deadlineDelete: boolean


}

export const RoleModel = getModelForClass(Role);
