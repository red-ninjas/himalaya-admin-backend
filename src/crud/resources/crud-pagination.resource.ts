import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { CrudPaginationMeta } from './crud-paginat-meta.resource';

export class CrudPaginationResource<T extends BaseEntity> {
  data: T[];

  @ApiProperty({ type: () => CrudPaginationMeta })
  meta: CrudPaginationMeta;

  setData(data: T[]) {
    this.data = data;
  }
  setMetaData(meta: CrudPaginationMeta) {
    this.meta = meta;
  }
}
