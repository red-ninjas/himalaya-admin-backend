import { DataSource } from 'typeorm';
import { UserClass } from './user.interface';

/**
 * Validates that the usernanme exists and has the given password
 */
export interface UserValidatorInterface {
  /**
   * Implement this method to validate the user existence
   *
   * @param email
   * @param password
   *
   * @return UserClass
   * @throws InvalidUserException
   */
  validate(
    datasource: DataSource,
    email: string,
    password: string,
  ): Promise<UserClass>;
}
