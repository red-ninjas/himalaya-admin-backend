import {
  ClassSerializerInterceptor,
  Header,
  SetMetadata,
  Type,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { ClassLike } from '../../types';
import { CrudSearchRequestFiltersGuard } from '../guards/crud-search-request-filters.guard';
import { CrudSearchRequestSortablesGuard } from '../guards/crud-search-request-sortables.guard';
import { CrudTransformPaginationInterceptor } from '../interceptor/crud-transform-pagination.interceptor';
import { ICrudSearchRequestOptions } from '../requests/crud-search.request';
import { CrudPaginationResource } from '../resources/crud-pagination.resource';
import {
  CrudFilterableRequest,
  CrudPaginationRequest,
  CrudSortableRequest,
} from '../requests';

export const CrudSearchRequest = <
  EntityDTO extends Type<BaseEntity>,
  ResponseDTO extends ClassLike<any> = EntityDTO
>(
  optionsOrEntity:
    | ICrudSearchRequestOptions<EntityDTO, ResponseDTO>
    | EntityDTO,
) => {
  const options =
    typeof optionsOrEntity === 'function'
      ? {
          sortable: [],
          filterable: [],
          output: optionsOrEntity,
          entity: optionsOrEntity,
        }
      : optionsOrEntity;

  const responseType = options.output ? options.output : options.entity;
  const filterKeys =
    options['filterable'] !== undefined ? Object.keys(options.filterable) : [];
  const sortableKeys =
    options['sortable'] !== undefined ? Object.keys(options.sortable) : [];

  return applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    UseInterceptors(
      new CrudTransformPaginationInterceptor(options.entity, options.output),
    ),
    Header('Content-Type', 'application/json'),
    SetMetadata('filterableFields', filterKeys),
    UseGuards(CrudSearchRequestFiltersGuard),
    SetMetadata('sortableFields', sortableKeys),
    SetMetadata('queryOutputType', responseType),
    UseGuards(CrudSearchRequestSortablesGuard),
    ApiExtraModels(CrudPaginationResource, responseType),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CrudPaginationResource) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(responseType) },
              },
            },
          },
        ],
      },
    }),
    ApiExtraModels(CrudPaginationRequest),
    ApiBody({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CrudPaginationRequest) },
          {
            properties: {
              sort: {
                type: 'array',
                items: {
                  allOf: [
                    { $ref: getSchemaPath(CrudSortableRequest) },
                    {
                      properties: {
                        field: {
                          type: 'enum',
                          enum: sortableKeys,
                        },
                      },
                    },
                  ],
                },
              },

              filter: {
                type: 'array',
                items: {
                  allOf: [
                    { $ref: getSchemaPath(CrudFilterableRequest) },
                    {
                      properties: {
                        field: {
                          type: 'enum',
                          enum: filterKeys,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    }),
  );
};
