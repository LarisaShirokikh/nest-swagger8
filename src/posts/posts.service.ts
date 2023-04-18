import { Injectable } from '@nestjs/common';

import { PostsRepository, PostsType } from "./posts.repository";
import { BlogsRepository } from "../blogs/blogs.repository";

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private blogsRepository: BlogsRepository
  ) {
  }
  async getAllPosts(
    pageNumber: string = "1" || undefined || null,
    pageSize: string = "10" || undefined || null,
    sortBy: string = 'createdAt',
  sortDirection: string = 'desc' || 'asc'): Promise<{}> {
    const postsDb = await this.postsRepository
      .getAllPosts(+pageNumber, +pageSize, sortBy, sortDirection)
    const posts = {...postsDb}
    return posts
  }
  async findBloggersPost(pageNumber: string = "1" || undefined || null, pageSize: string = "10" || undefined || null, bloggerId: string, userId: string): Promise<{}> {
    //@ts-ignore
    const postsDb = await this.postsRepository
      .findBloggersPost(+pageNumber,+pageSize, bloggerId, userId)
    const posts = {...postsDb}
    return posts
  }


  async findPosts(pageSize: number, pageNumber: number, userId: string) {
    return await this.postsRepository.findPosts(pageSize, pageNumber, userId)
  }

  async findPostById(postId: string, userId: string): Promise<PostsType | null> {
    return await this.postsRepository.findPostById(postId, userId)
  }

  async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | undefined> {
    const blogs = await this.blogsRepository.findOne(blogId)

    if (blogs) {
      const newPost = {
        id: +(new Date()),
        title,
        shortDescription,
        content,
        blogId,
        blogName: blogs.name,
        createdAt: new Date,
        // extendedLikesInfo: {
        //   likesCount: 0,
        //   dislikesCount: 0,
        //   myStatus: "None",
        //   newestLikes: []
        // }
      }

      // @ts-ignore
      return await this.postsRepository.createPost(newPost)
      //return createdPost
    }
  }

  async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
    return await this.postsRepository.updatePost(id, title, shortDescription, content, blogId)
  }

  async deletePosts(id: string) {
    return await this.postsRepository.deletePosts(id)
  }

  async getCount() {
    return await this.postsRepository.getCount()
  }

  async getPostById(postId: string): Promise<PostsType | null> {
    return this.postsRepository.getPostById(postId)
  }

  // async updateLikeStatus(user: any, postId: string, likeStatus: "None" | "Like" | "Dislike"): Promise<boolean | undefined> {
  //   const addedLikeStatusAt = new Date()
  //   const updateLike = await this.postsRepository.updateLikeStatus(user, postId, likeStatus, addedLikeStatusAt)
  //   console.log(updateLike)
  //   return updateLike
  // }
}
