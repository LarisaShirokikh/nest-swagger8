import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Blogs, BlogsSchema } from "../schemas/blogs.schema";
import { BlogsRepository } from "./blogs.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Blogs.name, schema: BlogsSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository]
})
export class BlogsModule {}
