import { ADMIN_FIELD_DECORATOR_EDITABLE_KEY } from '../constants';
import { IEditableColumn } from '../interfaces';
import { registerMetaField } from '../utilts';

export const EditableColumn = (options?: IEditableColumn) => {
  return function(object: Object, propertyKey: string) {
    registerMetaField(
      object.constructor,
      ADMIN_FIELD_DECORATOR_EDITABLE_KEY,
      propertyKey,
      options || {},
    );
  };
};
