import { DataSource } from 'typeorm';
import { UserClass } from './user.interface';

/**
 * This is the main interface you have to implement in order to have the appropriate
 */
export interface UserLoaderInterface {
  /**
   * Implement this interface to load your user into the payload from its id
   *
   * @param userId
   */
  load(dataSource: DataSource, userId: string): Promise<UserClass>;
}
