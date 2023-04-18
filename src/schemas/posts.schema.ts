import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop()
  id: String;
  @Prop()
  title: String;
  @Prop()
  shortDescription: String;
  @Prop()
  content: String;
  @Prop()
  blogId: String;
  @Prop()
  blogName: String;
  @Prop()
  createdAt: String
}

export const PostsSchema = SchemaFactory.createForClass(Posts);