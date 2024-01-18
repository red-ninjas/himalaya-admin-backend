import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { QueryRequest } from '../requests/requests';
import { BaseEntity } from 'typeorm';
import { Type } from '@nestjs/common';
import { PublicConstructor } from '../types';

export interface PaginationMetaParameters {
  options: QueryRequest;
  itemCount: number;
}

export class PaginationMeta {
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

  constructor({ options, itemCount }: PaginationMetaParameters) {
    this.page = options.page;
    this.take = options.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
export interface ISearchResponse<T> {
  readonly data: T[];
  readonly meta: PaginationMeta;

  setData(data: T[]);
  setMetaData(meta: PaginationMeta);
}

export const createSearchResponse = <T extends BaseEntity>(entity: {
  new (): T;
}): PublicConstructor<ISearchResponse<T>> => {
  class QueryPaginationResource {
    @IsArray()
    @ApiProperty({
      isArray: true,
      type: entity,
    })
    data: T[];

    @ApiProperty({ type: () => PaginationMeta })
    meta: PaginationMeta;

    setData(data: T[]) {
      this.data = data;
    }
    setMetaData(meta: PaginationMeta) {
      this.meta = meta;
    }
  }

  Object.defineProperty(QueryPaginationResource, 'name', {
    writable: false,
    value: `Search${entity.name}Response`,
  });

  return QueryPaginationResource;
};
