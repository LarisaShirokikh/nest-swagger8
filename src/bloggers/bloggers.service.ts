import { Injectable } from "@nestjs/common";
import { CreateBloggerDto } from "./dto/create-blogger.dto";
import { UpdateBloggerDto } from "./dto/update-blogger.dto";

@Injectable()
export class BloggersService {
  create(name: string, youtubeUrl: string) {
    return {
      id: +(new Date()),
      name: name,
      youtubeUrl: youtubeUrl
    };
  }

  findAll(searchNameTerm: string | null, pageNumber: string | 1, pageSize: string | 10) {
    return
    {
      pagesCount: 0,
      page: 0,
      pageSize: 0,
      totalCount: 0,
      items: []
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} blogger`;
  }

  update(id: number, updateBloggerDto: UpdateBloggerDto) {
    return `This action updates a #${id} blogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogger`;
  }
}
