import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';

/**
 * Main interface you have to implement if you want to deal with access tokens in your
 * Application
 */
export interface AccessTokenRepositoryInterface {
  /**
   * Find by access token
   *
   * @param accessToken
   *
   * @throws AccessTokenNotFoundException
   */
  findByAccessToken(accessToken: string): Promise<Oauth2AccessTokenEntity>;

  /**
   * Find by access token
   *
   * @param refreshToken
   *
   * @throws AccessTokenNotFoundException
   */
  findByRefreshToken(refreshToken: string): Promise<Oauth2AccessTokenEntity>;

  /**
   * Register a new access token into the storage
   *
   * @param accessToken
   */
  create(
    accessToken: Oauth2AccessTokenEntity,
  ): Promise<Oauth2AccessTokenEntity>;
}
