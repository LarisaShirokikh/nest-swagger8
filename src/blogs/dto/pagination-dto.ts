import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PageOptionsDto {

  readonly pagesCount: number
  readonly page: number
  readonly pageSize: number
  readonly totalCount: number
  readonly items: []
}