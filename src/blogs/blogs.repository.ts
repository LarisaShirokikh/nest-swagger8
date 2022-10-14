import { Injectable } from "@nestjs/common";
import { BlogsExtendedType } from "../types/blogs.type";
import { InjectModel } from "@nestjs/mongoose";
import { Blogs, BlogsDocument } from "../schemas/blogs.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blogs.name) private blogsModel: Model<BlogsDocument>) {
  }

  async getAllBloggers(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection
  ): Promise<BlogsExtendedType | undefined | null> {
    const blogs = await this.blogsModel.find({}, { _id: 0, password: 0, email: 0, isConfirmed: 0, __v: 0 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const blogsCount = await this.blogsModel.count({});
    const pagesCount = Math.ceil(blogsCount / pageSize);

    const result = {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize,
      totalCount: blogsCount,
      items: blogs,
    }
    return result;
  };

  async findOne(blogsFilterQuery: FilterQuery<Blogs>) {
    return this.blogsModel.findOne(blogsFilterQuery);
  }
  }