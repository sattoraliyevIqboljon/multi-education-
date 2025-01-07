import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class BaseModel {
    @prop({ default: false })
    isDeleted: boolean

    createdAt: Date
    updatedAt: Date
}

export class Logs {
    @prop({})
    ip: string

    @prop({})
    time: Date
}
