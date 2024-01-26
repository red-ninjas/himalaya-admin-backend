import { ApiProperty } from '@nestjs/swagger';
import { CrudPaginationRequest } from '../requests/crud-pagination.request';

export interface ICrudPaginationMetaParameters {
  options: CrudPaginationRequest;
  itemCount: number;
}

export class CrudPaginationMeta {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ options, itemCount }: ICrudPaginationMetaParameters) {
    this.page = options.page;
    this.take = options.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
