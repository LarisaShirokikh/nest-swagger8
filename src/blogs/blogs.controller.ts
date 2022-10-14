import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe
} from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { CreateBlogsDto } from "./dto/create-blogs.dto";
import { UpdateBloggerDto } from "./dto/update-blogger.dto";
import { query } from "express";
import { BlogsType } from "../types/blogs.type";


@Controller("blogs")
export class BlogsController {
  constructor(
    private readonly bloggersService: BlogsService
  ) {
  }

  @Post()
  async create(
    @Body() inputModel: BlogsType ) {
    return await this.bloggersService.create(inputModel)
};


  @Get()
  async findAll(@Query() query: {
    searchNameTerm: string;
    pageNumber: string;
    pageSize: string;
    sortBy: string;
    sortDirection: string
  }) {
    const bloggers = await this.bloggersService.getAllUsers(
      query.searchNameTerm,
      query.pageNumber,
      query.pageSize,
      query.sortBy,
      query.sortDirection
    );
    return bloggers;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bloggersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBloggerDto: UpdateBloggerDto) {
    return this.bloggersService.update(id, updateBloggerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bloggersService.remove(+id);
  }
}
