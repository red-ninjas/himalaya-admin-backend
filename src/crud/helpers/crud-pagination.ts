import { Type } from '@nestjs/common';
import _, { isArray } from 'lodash';
import {
  BaseEntity,
  ILike,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { FilterMatch } from '../interfaces';
import { CrudPaginationRequest } from '../requests';
import { CrudPaginationMeta, CrudPaginationResource } from '../resources';

export const crudPagination = async <
  T extends BaseEntity,
  TEntityType extends Type<BaseEntity> = Type<T>
>(
  entityType: TEntityType,
  builderOrRepo: SelectQueryBuilder<T> | Repository<T>,
  request: CrudPaginationRequest = new CrudPaginationRequest(),
): Promise<CrudPaginationResource<T>> => {
  const queryBuilder =
    builderOrRepo instanceof Repository
      ? builderOrRepo.createQueryBuilder()
      : builderOrRepo;

  const columns =
    builderOrRepo instanceof Repository
      ? builderOrRepo.metadata.columns
      : builderOrRepo.connection.getMetadata(entityType).columns;

  queryBuilder.skip(request.skip).take(request.take);
  const itemCount = await queryBuilder.getCount();

  if (request.sort !== undefined && isArray(request.sort)) {
    for (let item of request.sort) {
      const findField = _.find(columns, {
        propertyName: item.field,
      });

      const fieldName = findField.databaseName || findField.propertyName;
      queryBuilder.orderBy(fieldName, item.order);
    }
  }

  if (request.filter !== undefined && isArray(request.filter)) {
    for (let item of request.filter) {
      const findField = _.find(columns, {
        propertyName: item.field,
      });

      const fieldName = findField.propertyName;

      const filter = {};
      if (item.condition == FilterMatch.ENDS_WITH) {
        filter[fieldName] = ILike(`%${item.term}`);
      } else if (item.condition == FilterMatch.EQUALS) {
        filter[fieldName] = `${item.term}`;
      } else if (item.condition == FilterMatch.GREATHER) {
        filter[fieldName] = MoreThan(item.term);
      } else if (item.condition == FilterMatch.GREATHER_OR_EQUAL) {
        filter[fieldName] = MoreThanOrEqual(item.term);
      } else if (item.condition == FilterMatch.IS_NULL) {
        filter[fieldName] = IsNull();
      } else if (item.condition == FilterMatch.LIKE) {
        filter[fieldName] = ILike(`%${item.term}%`);
      } else if (item.condition == FilterMatch.LOWER) {
        filter[fieldName] = LessThan(item.term);
      } else if (item.condition == FilterMatch.LOWER_OR_EQUAL) {
        filter[fieldName] = LessThanOrEqual(item.term);
      } else if (item.condition == FilterMatch.NOT) {
        filter[fieldName] = Not(item.term);
      } else if (item.condition == FilterMatch.NOT_NULL) {
        filter[fieldName] = Not(IsNull());
      } else if (item.condition == FilterMatch.STARTS_WITH) {
        filter[fieldName] = ILike(`${item.term}%`);
      } else if (item.condition == FilterMatch.UNEQUAL) {
        filter[fieldName] = Not(item.term);
      }
      queryBuilder.where(filter);
    }
  }

  const { entities } = await queryBuilder.getRawAndEntities<T>();
  const pageMetaDto = new CrudPaginationMeta({ itemCount, options: request });
  const reponse = new CrudPaginationResource<T>();

  reponse.setData(entities);
  reponse.setMetaData(pageMetaDto);

  return reponse;
};
