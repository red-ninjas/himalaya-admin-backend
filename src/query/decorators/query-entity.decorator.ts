import _ from 'lodash';
import { BaseEntity } from 'typeorm';
import {
  ADMIN_FIELD_CLASS_DECORATOR_KEY,
  DEFAULT_SYSTEM_PERMISSION,
} from '../constants';
import { IQueryEntity } from '../interfaces/query-group.interface';

export const QueryEntity = (options?: IQueryEntity) => {
  return function(object: typeof BaseEntity) {
    Reflect.defineMetadata(
      ADMIN_FIELD_CLASS_DECORATOR_KEY,
      _.defaults(options, {
        permission: DEFAULT_SYSTEM_PERMISSION,
      }),
      object,
    );
  };
};
