import { Body, Injectable, Param } from "@nestjs/common";
import { UpdateBloggerDto } from "./dto/update-blogger.dto";
import { BlogsDocument, BlogsSchema } from "../schemas/blogs.schema";
import { BlogsExtendedType, BlogsType } from "../types/blogs.type";
import { BlogsRepository } from "./blogs.repository";

@Injectable()
export class BlogsService {
  constructor(
    protected bloggersRepository: BlogsRepository,
    protected blogsModel: BlogsRepository
  ) {}

  // async paginate(options: IPaginationOptions): Promise<Pagination<Blogger>> {
  //   const queryBuilder = this.repository.createQueryBuilder('c');
  //   queryBuilder.orderBy('c.name', 'DESC');
  //
  //   return
  //   //paginate<Blogger>(queryBuilder, options);
  // }

  async create(@Body() inputModel: BlogsType): Promise<BlogsType> {
    const createdBlogger = new this.blogsModel(BlogsSchema);
    await createdBlogger.save();
    const blogger = await this.blogsModel.findOne({id: createdBlogger.id}, {_id: 0, __v: 0})
    return blogger
  }


  findOne(id: string) {
    return `This action returns a #${id} blogger`;
  }

  update(id: string, updateBloggerDto: UpdateBloggerDto) {
    return `This action updates a #${id} blogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogger`;
  }


  async getAllUsers(searchNameTerm: string = null || undefined,
                    pageNumber: string = '1' || undefined,
                    pageSize: string = '10' || undefined,
                    sortBy: string = 'createdAt' || undefined,
                    sortDirection: string = 'desc' || undefined ): Promise<BloggersExtendedType> {
    return this.bloggersRepository.getAllBloggers(searchNameTerm, +pageNumber, +pageSize, sortBy, sortDirection);
  }
}
