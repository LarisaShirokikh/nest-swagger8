import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogsDto } from './create-blogs.dto';

export class UpdateBloggerDto extends PartialType(CreateBlogsDto) {}
