import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Blogs, BlogsSchema } from "../schemas/blogs.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Blogs.name, schema: BlogsSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
