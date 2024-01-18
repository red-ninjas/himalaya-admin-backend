import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { QueryService } from '../services/query.service';

import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { QueryRequest } from '../requests';
import {
  ISearchResponse,
  PaginationMeta,
  createSearchResponse,
} from '../resources';
import { PublicConstructor } from '../types';
import { isArray } from 'class-validator';
import {
  applyFilter,
  applySort,
  getAllEditableFields,
  getAllSortableFields,
  getAllViewableFields,
  getEntityMeta,
  getFilterableFields,
} from '../helpers';

export interface IQueryController {}

export const QueryController = <T extends BaseEntity>(entity: {
  new (): T;
}): PublicConstructor<IQueryController> => {
  const SearchResponse = createSearchResponse(entity);

  @Controller({
    version: ['1'],
  })
  @ApiExtraModels(entity)
  //@AccessTokenRequired()
  //@ApiBearerAuth()
  class QueryController {
    constructor(
      @InjectRepository(entity)
      protected repository: Repository<T>,
      protected queryService: QueryService,
    ) {}

    @Post('collection')
    @Version('1')
    @Header('Content-Type', 'application/json')
    @ApiOkResponse({
      description: 'The user records',
      type: SearchResponse,
    })
    public async getCollectionPost(
      @Body() options: QueryRequest,
    ): Promise<ISearchResponse<T>> {
      const queryBuilder = this.repository.createQueryBuilder();
      queryBuilder.skip(options.skip).take(options.take);

      const itemCount = await queryBuilder.getCount();

      if (options.sort !== undefined && isArray(options.sort)) {
        for (let item of options.sort) {
          applySort(entity, item, queryBuilder);
        }
      }

      if (options.filter !== undefined && isArray(options.filter)) {
        for (let item of options.filter) {
          applyFilter(entity, item, queryBuilder);
        }
      }
      const { entities } = await queryBuilder.getRawAndEntities<T>();
      const pageMetaDto = new PaginationMeta({ itemCount, options });
      const reponse = new SearchResponse();

      reponse.setData(entities);
      reponse.setMetaData(pageMetaDto);

      return reponse;
    }

    @Get('schema')
    @Version('1')
    @Header('Content-Type', 'application/json')
    public async schema() {
      return {
        fields: {
          viewable: getAllViewableFields(entity),
          editable: getAllEditableFields(entity),
          sortable: getAllSortableFields(entity),
          filterable: getFilterableFields(entity),
        },
        entity: getEntityMeta(entity),
      };
    }

    @Post('item')
    @Version('1')
    public async create(@Body() createUserDto) {}

    @Get('item/:id')
    @Version('1')
    public async findOne(@Param('id') id: string) {}

    @Patch('item/:id')
    @Version('1')
    public async update(@Param('id') id: string, @Body() data: T) {
      return data;
    }

    @Delete('item/:id')
    @Version('1')
    public async remove(@Param('id') id: string) {}
  }

  Object.defineProperty(QueryController, 'name', {
    writable: false,
    value: `Query${entity.name}Controller`,
  });

  return QueryController;
};
