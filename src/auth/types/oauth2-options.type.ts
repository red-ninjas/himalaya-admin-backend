import { UserLoaderInterface, UserValidatorInterface } from '../interfaces';
import { SystemAdminInterface } from '../interfaces/system-admin.interface';

export type OAuth2Options = {
  userLoader: UserLoaderInterface;
  userValidator: UserValidatorInterface;
  systemAdminCreator: SystemAdminInterface;
  jwtSecret: string;
  jwtExpires?: string | number | undefined;
  jwtRefreshExpires?: string | number | undefined;
};
