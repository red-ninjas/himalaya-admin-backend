import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { FilterMatch } from '../interfaces';

export class CrudFilterableRequest {
  @IsString()
  @ApiProperty({})
  @Type(() => String)
  readonly field: string;

  @IsString()
  @ApiPropertyOptional({})
  @IsOptional()
  @Type(() => String)
  readonly term: string;

  @ApiProperty({ enum: FilterMatch })
  @IsEnum(FilterMatch)
  readonly condition: FilterMatch = FilterMatch.LIKE;
}
