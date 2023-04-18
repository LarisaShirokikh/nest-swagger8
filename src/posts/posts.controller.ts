import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsType } from "./posts.repository";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() title: string,
               shortDescription: string, content: string, blogId: string) {
    return await this.postsService
      .createPost(title, shortDescription, content, blogId);
  }

  @Get()
   async findAll(
     @Query()
       pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
    return await this.postsService.getAllPosts(
      //@ts-ignore
      pageNumber, pageSize, sortBy, sortDirection);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
         @Body() title, shortDescription, content, blogId) {
    return this.postsService.updatePost(id, title, shortDescription, content, blogId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePosts(id);
  }
}
