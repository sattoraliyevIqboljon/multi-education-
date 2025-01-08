import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { Group } from "../group/group.model";
import { Teacher } from "../teacher/teacher.model";
import { CollectionNames } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Weekday } from "../../../../constant/enum";


@modelOptions({
  schemaOptions: {
      collection: CollectionNames.TIMETABLE
  }
})
export class Timetable extends BaseModel {
  // @prop({ required: true })
  // date: string; // YYYY-MM-DD formatida saqlanadi

  @prop({ type: Types.ObjectId, ref: CollectionNames.GROUP, required: true })
  groupId: Ref<Group>;

  @prop({ type: Types.ObjectId, ref: CollectionNames.COURSE, required: true })
  courseId: Ref<Course>;

  @prop({ type: Types.ObjectId, ref: CollectionNames.TEACHER, required: true })
  teacherId: Ref<Teacher>;

  @prop({ required: true })
  startTime: string; // Boshlanish vaqti (masalan, 1-Yanvar)

  @prop({ required: true })
  endTime: string; // Tugash vaqti (masalan, 30-mart)

  @prop({ enum: Object.values(Weekday), type: String })
  weekdays: Weekday[]; // Hayfta kunlari (masalan: Dushanba , seshanba ....)

}

export const TimetableModel = getModelForClass(Timetable);
