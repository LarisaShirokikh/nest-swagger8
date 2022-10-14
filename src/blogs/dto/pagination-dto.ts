import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PageOptionsDto {
  // @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  // @IsEnum(Order)
  // @IsOptional()
  // readonly order?: Order = Order.ASC;
  //
  // @ApiPropertyOptional({
  //   minimum: 1,
  //   default: 1,
  // })
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @IsOptional()
  // readonly page?: number = 1;
  //
  // @ApiPropertyOptional({
  //   minimum: 1,
  //   maximum: 50,
  //   default: 10,
  // })
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @Max(50)
  // @IsOptional()
  // readonly take?: number = 10;
  //
  // get skip(): number {
  //   return (this.page - 1) * this.take;
  // }
  readonly pagesCount: number
  readonly page: number
  readonly pageSize: number
  readonly totalCount: number
  readonly items: []
}