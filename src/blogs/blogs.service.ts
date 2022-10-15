import { Injectable } from "@nestjs/common";
import { UpdateBlogsDto } from "./dto/update.blogs.dto";
import { Blogs } from "../schemas/blogs.schema";
import { BlogsExtendedType } from "../types/blogs.type";
import { BlogsRepository } from "./blogs.repository";
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogsRepository: BlogsRepository
  ) {}


  async create(name: string, youtubeUrl: string): Promise<Blogs> {
    return await this.blogsRepository.create({
      id: uuidv4(),
      name,
      youtubeUrl,
      createdAt: (new Date()).toString()
    })
  }


  async getBlogsById(blogsId: string): Promise<Blogs> {
    return this.blogsRepository.findOne({blogsId});
  }

  async updateBlogs(blogsId: string, blogsUpdates: UpdateBlogsDto): Promise<Blogs> {
    return this.blogsRepository.findOneAndUpdate({ blogsId }, blogsUpdates);
  }

  async remove(blogsId: string): Promise<Blogs> {
    return this.blogsRepository.findOneAndDelete({ blogsId });
  }


  async getAllBlogs(searchNameTerm: string = null || undefined,
                    pageNumber: string = '1' || undefined,
                    pageSize: string = '10' || undefined,
                    sortBy: string = 'createdAt' || undefined,
                    sortDirection: string = 'desc' || undefined ): Promise<BlogsExtendedType> {
    return this.blogsRepository.getAllBloggers(searchNameTerm, +pageNumber, +pageSize, sortBy, sortDirection);
  }
}
