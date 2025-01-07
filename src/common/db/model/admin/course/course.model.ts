import { modelOptions, prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { CollectionNames } from "../../../../constant/collections";
import { BaseModel, Logs } from "../../base.model";

// Course Model
@modelOptions({
    schemaOptions: {
      collection: CollectionNames.COURSE,
    },
  })


export class Course extends BaseModel {
    @prop({ required: true })
    title: string;
  
    @prop({})
    description: string;


  }
  export const CourseModel = getModelForClass(Course);
