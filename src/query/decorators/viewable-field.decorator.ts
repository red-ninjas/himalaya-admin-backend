import { ADMIN_FIELD_DECORATOR_VIEWABLE_KEY } from '../constants';
import { IViewableColumn } from '../interfaces/fields/viewable-field.interface';
import { registerMetaField } from '../utilts';

export const ViewableColumn = (options?: IViewableColumn) => {
  return function(object: Object, propertyKey: string) {
    registerMetaField(
      object.constructor,
      ADMIN_FIELD_DECORATOR_VIEWABLE_KEY,
      propertyKey,
      options || {},
    );
  };
};
