import { Type } from '@nestjs/common';
import { ClassLike, ClassProperties } from '../../types';
import { BaseEntity } from 'typeorm';

export interface ICrudSearchRequestOptions<
  EntityDTO extends Type<BaseEntity>,
  ResponseDTO extends ClassLike<any> = EntityDTO
> {
  entity: EntityDTO;
  output?: ResponseDTO;
  sortable?: ClassProperties<EntityDTO>;
  filterable?: ClassProperties<EntityDTO>;
}
