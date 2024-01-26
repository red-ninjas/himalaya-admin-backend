import { ApiExtraModels, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CrudFilterableRequest } from './crud-filterable.request';
import { CrudSortableRequest } from './crud-sortable.request';

@ApiExtraModels(CrudFilterableRequest, CrudSortableRequest)
export class CrudPaginationRequest {
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

  @ApiPropertyOptional({ type: CrudSortableRequest, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CrudSortableRequest)
  readonly sort?: CrudSortableRequest[];

  @ApiPropertyOptional({ type: CrudFilterableRequest, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CrudFilterableRequest)
  readonly filter?: CrudFilterableRequest[];
}
