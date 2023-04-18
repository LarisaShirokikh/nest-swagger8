import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Posts, PostsSchema } from "../schemas/posts.schema";
import { PostsRepository } from "./posts.repository";
import { BlogsRepository } from "../blogs/blogs.repository";
import { Blogs, BlogsSchema } from "../schemas/blogs.schema";

const models = [
  { name: Posts.name, schema: PostsSchema },
  { name: Blogs.name, schema: BlogsSchema },
]

@Module({
  imports: [
    MongooseModule.forFeature(models)],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, BlogsRepository]
})
export class PostsModule {}
