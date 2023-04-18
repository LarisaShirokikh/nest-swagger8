import { IsInt, IsString, Length } from "class-validator";

export class CreateBlogsDto {
  @IsString()
  @Length(3, 100)
  readonly id: string
  readonly name: string
  readonly youtubeUrl: string
  readonly createdAt: string

}
