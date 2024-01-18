import _ from 'lodash';
import { ADMIN_FIELD_DECORATOR_FILTERABLE_KEY } from '../constants';
import { IFilterableColumn } from '../interfaces';
import { registerMetaField } from '../utilts';

export const FilterableColumn = (options?: IFilterableColumn) => {
  return function(object: Object, propertyKey: string) {
    registerMetaField(
      object.constructor,
      ADMIN_FIELD_DECORATOR_FILTERABLE_KEY,
      propertyKey,
      _.defaults(options || {}, {}),
    );
  };
};
