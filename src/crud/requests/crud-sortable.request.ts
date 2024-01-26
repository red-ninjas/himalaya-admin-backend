import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum } from 'class-validator';
import { QueryOrder } from '../interfaces';

export class CrudSortableRequest {
  @IsString()
  @ApiProperty({})
  @Type(() => String)
  readonly field: string;

  @ApiPropertyOptional({ enum: QueryOrder })
  @IsEnum(QueryOrder)
  readonly order: QueryOrder = QueryOrder.ASC;
}
