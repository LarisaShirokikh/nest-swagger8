import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BlogsDocument = Blogs & Document;

@Schema()
export class Blogs {
  @Prop()
  id: String;
  @Prop()
  name: String;
  @Prop()
  youtubeUrl: String;
  @Prop()
  createdAt: String
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);