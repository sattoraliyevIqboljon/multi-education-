import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Types } from "mongoose";
import { Course } from "../course/course.model";


@modelOptions({
    schemaOptions: {
        collection: CollectionNames.GROUP
    }
})



export class Group extends BaseModel {
    @prop({ required: true, unique:true })
    name: string;

    @prop({})
    description: string;


    @prop({ type: () => [Types.ObjectId], ref: CollectionNames.COURSE })
    courses: Ref<Course>[];

  }
  
  export const GroupModel = getModelForClass(Group);