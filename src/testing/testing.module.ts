import { Module } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { testUsersSchema } from "../schemas/users.schema";
import {
  usersEmailConfDataSchema
} from "../schemas/usersEmailConfData.schema";
import { Posts, PostsSchema } from "../schemas/posts.schema";
import { Blogs, BlogsSchema } from "../schemas/blogs.schema";
import { Comments, CommentsSchema } from "../schemas/comments.schema";
import { EndpointsAttemptsTrysSchema } from "../schemas/endpoint.schema";


const models = [
  { name: Blogs.name, schema: BlogsSchema },
  { name: Posts.name, schema: PostsSchema },
  { name: 'testUsersSchema', schema: testUsersSchema},
  { name: Comments.name, schema: CommentsSchema },
  { name: 'endpointsAttemptsTrysSchema', schema: EndpointsAttemptsTrysSchema },
  { name: 'usersEmailConfDataSchema', schema: usersEmailConfDataSchema },

]

@Module({
  imports: [
    MongooseModule.forFeature(models)
  ],
  controllers: [TestingController],
  providers: [TestingService]
})
export class TestingModule {}
