import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comments, CommentsDocument } from "../schemas/comments.schema";
import { Model } from "mongoose";
import "reflect-metadata";
import { User } from "../users/entities/user.entity";



export type ReturnFindCommentIdType = {

  id: string,
  content: string,
  userId: string,
  userLogin: string,
  createdAt: any,
}

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comments.name)
              private commentsModel: Model<CommentsDocument>,
              ) {
  }


  async findComment(commentId: string, userId: string): Promise<ReturnFindCommentIdType | null> {
    return this.commentsModel.findOne({ id: commentId });
  }

  async deleteComment(id: string) {
    const result = await this.commentsModel.deleteOne({id: id})
    return result.deletedCount === 1
  }
  // async findUsersOne(usersFilterQuery: FilterQuery<Users>) {
  //   return this.usersModel.find({usersFilterQuery},  {projection: {_id: 0}})
  // }






  async getCommentById(id: string): Promise<User> {
    return this.commentsModel.findOne({id}, {_id: 0, password: 0, isConfirmed: 0, __v: 0})

  }
}