import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CrudEntity,
  CrudEntityRequest,
  CrudPaginationRequest,
  CrudPaginationResource,
  CrudSearchRequest,
  CrudTransformResponse,
  crudPagination,
} from '../../crud';

import { AuthPermission } from '../decorators/auth-permission.decorator';
import { AuthJwtTokenEntity } from '../entities/auth-jwt-token.entity';
import { AuthJwtTokenResponse } from '../responses/auth-jwt-token.response';

/*
export const applySort = (
  entity: Object,
  field: CrudSortableRequest,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const fields = getAllSortableFields(entity);

  if (!Object.keys(fields).includes(field.field)) {
    throw new UnauthorizedException(
      field.field + ' is not accessable as order field.',
    );
  } else {
    queryBuilder.orderBy(field.field, field.order);
  }
};

export const applyFilter = (
  entity: Object,
  field: CrudFilterableRequest,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const fields = getFilterableFields(entity);

  if (!Object.keys(fields).includes(field.field)) {
    throw new UnauthorizedException(
      field.field + ' is not accessable as filter field.',
    );
  } else {
    const filter = {};
    if (field.condition == FilterMatch.ENDS_WITH) {
      filter[field.field] = ILike(`%${field.term}`);
    } else if (field.condition == FilterMatch.EQUALS) {
      filter[field.field] = `${field.term}`;
    } else if (field.condition == FilterMatch.GREATHER) {
      filter[field.field] = MoreThan(field.term);
    } else if (field.condition == FilterMatch.GREATHER_OR_EQUAL) {
      filter[field.field] = MoreThanOrEqual(field.term);
    } else if (field.condition == FilterMatch.IS_NULL) {
      filter[field.field] = IsNull();
    } else if (field.condition == FilterMatch.LIKE) {
      filter[field.field] = ILike(`%${field.term}%`);
    } else if (field.condition == FilterMatch.LOWER) {
      filter[field.field] = LessThan(field.term);
    } else if (field.condition == FilterMatch.LOWER_OR_EQUAL) {
      filter[field.field] = LessThanOrEqual(field.term);
    } else if (field.condition == FilterMatch.NOT) {
      filter[field.field] = Not(field.term);
    } else if (field.condition == FilterMatch.NOT_NULL) {
      filter[field.field] = Not(IsNull());
    } else if (field.condition == FilterMatch.STARTS_WITH) {
      filter[field.field] = ILike(`${field.term}%`);
    } else if (field.condition == FilterMatch.UNEQUAL) {
      filter[field.field] = Not(field.term);
    }
    queryBuilder.where(filter);
  }
};
*/

@Controller({
  path: 'tokens',
  version: ['1'],
})
@AuthPermission()
@ApiTags('auth')
export class TokenController {
  constructor(
    @InjectRepository(AuthJwtTokenEntity)
    protected repository: Repository<AuthJwtTokenEntity>,
  ) {}

  @Post('collection')
  @CrudSearchRequest({
    entity: AuthJwtTokenEntity,
    output: AuthJwtTokenResponse,
    sortable: { accessToken: true },
    filterable: { accessToken: true, identifier: true },
  })
  public async getCollectionPost(
    @Body() options: CrudPaginationRequest,
  ): Promise<CrudPaginationResource<AuthJwtTokenEntity>> {
    return await crudPagination(AuthJwtTokenEntity, this.repository, options);
  }

  @Get('revoke/:id')
  @CrudEntityRequest(AuthJwtTokenEntity, 'id')
  public async revokeToken(@CrudEntity() record: AuthJwtTokenEntity) {
    record.revokedAt = new Date();
    await record.save();
  }

  @Delete('item/:id')
  @CrudEntityRequest(AuthJwtTokenEntity, 'id')
  public async deleteRequest(@CrudEntity() record: AuthJwtTokenEntity) {
    await record.remove();
  }

  @Get('item/:id')
  @CrudEntityRequest(AuthJwtTokenEntity, 'id')
  @CrudTransformResponse(AuthJwtTokenEntity, AuthJwtTokenResponse)
  public async getRequest(@CrudEntity() record: AuthJwtTokenEntity) {
    return record;
  }
}
