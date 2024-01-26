import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';

/** define payload types */
export enum Oauth2PayloadType {
  CLIENT = 'client',
  USER = 'user',
}

/**
 * User payloads are used in the guard when the user still finish
 */
export interface Oauth2PayloadInterface {
  // Store the current type of payload user or client
  // When the client is connected he should only be able to access his own resources
  readonly type: Oauth2PayloadType;

  // This is the access token which is currently connected within the application
  readonly accessToken: Oauth2AccessTokenEntity;

  // The ID is common to all
  readonly id: string;
}
