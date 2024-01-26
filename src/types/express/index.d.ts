import { BaseEntity } from 'typeorm';
import { UserClass } from '../../auth/interfaces/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user: UserClass;
      userToken: string;
      filterableFields: string[] | undefined;
      sortableFields: string[] | undefined;
      queryType: typeof BaseEntity;
      queryItem: BaseEntity;
    }
  }
}
