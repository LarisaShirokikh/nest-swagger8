import { Injectable } from '@nestjs/common';
import { Blogs, BlogsDocument } from "../schemas/blogs.schema";
import { Model } from "mongoose";
import { Posts, PostsDocument } from "../schemas/posts.schema";
import { Comments, CommentsDocument } from "../schemas/comments.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UsersDBType, UsersEmailConfDataType } from "../users/users.repository";
import { EndpointsAttemptsTrysType } from "../types/endpoint.attempts.type";


@Injectable()
export class TestingService {
  constructor(
              @InjectModel(Blogs.name) private blogsModel: Model<BlogsDocument>,
              @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
              @InjectModel('testUsersSchema') private usersModel: Model<UsersDBType>,
              @InjectModel(Comments.name) private commentsModel: Model<CommentsDocument>,
              @InjectModel('endpointsAttemptsTrysSchema') private endpointsAttemptsTrysModel: Model<EndpointsAttemptsTrysType>,
              @InjectModel('usersEmailConfDataSchema') private usersEmailConfDataModel: Model<UsersEmailConfDataType>,
  ) {}


  async deleteAll() {
    await this.blogsModel.deleteMany({})
    await this.postsModel.deleteMany({})
    await this.usersModel.deleteMany({})
    await this.commentsModel.deleteMany({})
    await this.endpointsAttemptsTrysModel.deleteMany({})
    await this.usersEmailConfDataModel.deleteMany({})

    return
  }

}
