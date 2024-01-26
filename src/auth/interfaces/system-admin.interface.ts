import { DataSource } from 'typeorm';
import { UserClass } from './user.interface';

/**
 * Validates that the usernanme exists and has the given password
 */
export interface SystemAdminInterface {
  /**
   * Implement this method to validate the user existence
   *
   * @param datasource
   * @param email
   * @param plainPassword
   *
   * @return UserClass
   * @throws InvalidUserException
   */
  create(
    datasource: DataSource,
    email: string,
    plainPassword: string,
  ): Promise<UserClass>;
}
