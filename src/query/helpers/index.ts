import { UnauthorizedException } from '@nestjs/common';
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
import {
  ADMIN_FIELD_CLASS_DECORATOR_KEY,
  ADMIN_FIELD_DECORATOR_EDITABLE_KEY,
  ADMIN_FIELD_DECORATOR_FILTERABLE_KEY,
  ADMIN_FIELD_DECORATOR_SORTABLE_KEY,
  ADMIN_FIELD_DECORATOR_VIEWABLE_KEY,
} from '../constants';
import {
  FilterMatch,
  IEditableColumn,
  IFilterableColumn,
  IQueryEntity,
  ISortableColumn,
  IViewableColumn,
  QueryDictionary,
} from '../interfaces';
import { FilterableRequest, SortableRequest } from '../requests/requests';
import { getMetaField } from '../utilts';

export const getAllTypeOrmFields = (repo: Repository<any>): string[] => {
  return repo.metadata.columns.map(df => df.propertyName);
};

export const getFieldByMetaKey = <T = any>(
  metaKey: Symbol,
  entity: Object,
): QueryDictionary<T> => {
  const fields = getMetaField(entity, metaKey);
  const entries = Object.fromEntries(
    fields.map(item => {
      return [item, Reflect.getMetadata(metaKey, entity, item) as T];
    }),
  );

  return entries;
};

export const getEntityMeta = (entity: Object): IQueryEntity => {
  return Reflect.getMetadata(
    ADMIN_FIELD_CLASS_DECORATOR_KEY,
    entity,
  ) as IQueryEntity;
};

export const getFilterableFields = (entity: Object) => {
  return getFieldByMetaKey<IFilterableColumn>(
    ADMIN_FIELD_DECORATOR_FILTERABLE_KEY,
    entity,
  );
};

export const getAllSortableFields = (entity: Object) => {
  return getFieldByMetaKey<ISortableColumn>(
    ADMIN_FIELD_DECORATOR_SORTABLE_KEY,
    entity,
  );
};

export const getAllViewableFields = (entity: Object) => {
  return getFieldByMetaKey<IViewableColumn>(
    ADMIN_FIELD_DECORATOR_VIEWABLE_KEY,
    entity,
  );
};

export const getAllEditableFields = (entity: Object) => {
  return getFieldByMetaKey<IEditableColumn>(
    ADMIN_FIELD_DECORATOR_EDITABLE_KEY,
    entity,
  );
};

export const applySort = (
  entity: Object,
  field: SortableRequest,
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
  field: FilterableRequest,
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
