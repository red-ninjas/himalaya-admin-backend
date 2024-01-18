import { BaseEntity } from 'typeorm';
import { ADMIN_FIELD_DECORATOR_SORTABLE_KEY } from '../constants';
import { ISortableColumn } from '../interfaces/fields/sortable-field.interface';
import { registerMetaField } from '../utilts';

export const SortableColumn = (options: ISortableColumn) => {
  return function(object: Object, propertyKey: string) {
    registerMetaField(
      object.constructor,
      ADMIN_FIELD_DECORATOR_SORTABLE_KEY,
      propertyKey,
      options || {},
    );
  };
};
