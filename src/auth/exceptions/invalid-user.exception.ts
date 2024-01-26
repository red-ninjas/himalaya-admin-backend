import { UnauthorizedException } from '@nestjs/common';

/**
 * Exception thrown when a user is invalid
 */
export class InvalidUserException extends UnauthorizedException {
  /**
   * Kind message with email and password
   *
   * @param email
   * @param password
   */
  static wrongCredentials(): InvalidUserException {
    return new InvalidUserException(
      `We couldn't find any users with these credentials.`,
    );
  }

  /**
   * Kind message with id
   *
   * @param userId
   */
  static withId(userId: string): InvalidUserException {
    return new InvalidUserException(
      `The user with id "${userId}" was not found`,
    );
  }
}
