import {
  ApiPropertyOptional,
  ApiProperty,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  Max,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { QueryOrder } from '../interfaces/query-order.enum';
import { FilterMatch } from '../interfaces';

export class SortableRequest {
  @IsString()
  @ApiPropertyOptional({})
  @Type(() => String)
  readonly field: string;

  @ApiPropertyOptional({ enum: QueryOrder })
  @IsEnum(QueryOrder)
  readonly order: QueryOrder = QueryOrder.ASC;
}

export class FilterableRequest {
  @IsString()
  @ApiProperty()
  @IsOptional()
  @Type(() => String)
  readonly field: string;

  @IsString()
  @ApiPropertyOptional()
  @Type(() => String)
  readonly term: string;

  @IsString()
  @ApiPropertyOptional({ enum: FilterMatch })
  @IsEnum(FilterMatch)
  readonly condition: FilterMatch = FilterMatch.LIKE;
}

@ApiExtraModels(FilterableRequest, SortableRequest)
export class QueryRequest {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 200,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional({ type: SortableRequest, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SortableRequest)
  readonly sort?: SortableRequest[];

  @ApiPropertyOptional({ type: FilterableRequest, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterableRequest)
  readonly filter?: FilterableRequest[];
}
