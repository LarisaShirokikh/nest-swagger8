import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { UpdateBlogsDto } from "./dto/update.blogs.dto";
import { Blogs } from "../schemas/blogs.schema";
import { CreateBlogsDto } from "./dto/create.blogs.dto";



@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService
  ) {
  }

  @Post()
  async create(
    @Body() createBlogsDto: CreateBlogsDto ) {
    return await this.blogsService.create(createBlogsDto.name, createBlogsDto.youtubeUrl)
};


  @Get()
  async findAll(@Query() query: {
    searchNameTerm: string;
    pageNumber: string;
    pageSize: string;
    sortBy: string;
    sortDirection: string
  }): Promise<Blogs[]> {
    const blogs = await this.blogsService.getAllBlogs(
      query.searchNameTerm,
      query.pageNumber,
      query.pageSize,
      query.sortBy,
      query.sortDirection
    );
    //@ts-ignore
    return blogs;
  }

  @Get(":blogsId")
  findOne(@Param("blogsId") blogsId: string): Promise<Blogs> {
    return this.blogsService.getBlogsById(blogsId);
  }

  @Patch(":blogsId")
  update(@Param("blogsId") blogsId: string, @Body() updateBloggerDto: UpdateBlogsDto): Promise<Blogs> {
    return this.blogsService.updateBlogs(blogsId, updateBloggerDto);

  }

  @Delete(":blogsId")
  remove(@Param("blogsId") blogsId: string) {
    return this.blogsService.remove(blogsId);
  }
}
