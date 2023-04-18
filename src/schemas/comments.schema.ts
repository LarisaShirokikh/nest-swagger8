import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop()
    id: String;
    @Prop()
    content: String;
    @Prop()
    userid: String;
    @Prop()
    userLogin: String;

    @Prop()
    createdAt: String

}


export const CommentsSchema = SchemaFactory.createForClass(Comments);