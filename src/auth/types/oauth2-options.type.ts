import { UserLoaderInterface, UserValidatorInterface } from '../interfaces';

export type OAuth2Options = {
  userLoader: UserLoaderInterface;
  userValidator: UserValidatorInterface;
};
