import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccessTokenCommand } from '../commands/create-access-token.command';
import { Oauth2GrantStrategy } from '../decorators/oauth2-grant-strategy.decorator';
import { Oauth2ClientEntity } from '../entities/oauth2-client.entity';
import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';
import {
  Oauth2GrantStrategyInterface,
  ClientRepositoryInterface,
  AccessTokenRepositoryInterface,
} from '../interfaces';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { OAuth2Response } from '../responses/oauth2-response.dto';

@Oauth2GrantStrategy('refresh_token')
export class RefreshTokenStrategy implements Oauth2GrantStrategyInterface {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param accessTokenRepository
   * @param commandBus
   */
  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
    @Inject('AccessTokenRepositoryInterface')
    private readonly accessTokenRepository: AccessTokenRepositoryInterface,
    private readonly commandBus: CommandBus,
  ) {}

  async validate(
    request: OAuth2Request,
    client: Oauth2ClientEntity,
  ): Promise<boolean> {
    if (
      (client.clientSecret && client.clientSecret !== request.clientSecret) ||
      client.deletedAt !== null ||
      !client.grants.includes(request.grantType)
    ) {
      return false;
    }

    return true;
  }

  async getOauth2Response(
    request: OAuth2Request,
    client: Oauth2ClientEntity,
  ): Promise<OAuth2Response> {
    const expiredToken = await this.accessTokenRepository.findByRefreshToken(
      request.refreshToken,
    );
    if (
      expiredToken.refreshTokenExpiresAt < new Date(Date.now()) ||
      expiredToken.client.clientId !== client.clientId
    ) {
      throw new UnauthorizedException(
        'You are not allowed to access the given resource',
      );
    }

    // Create a new AccessToken
    const exp =
      (Date.now() + expiredToken.client.accessTokenLifetime * 1000) / 1000;
    const iat = Date.now() / 1000;
    const accessToken: Oauth2AccessTokenEntity = await this.commandBus.execute(
      new CreateAccessTokenCommand(
        expiredToken.client.id,
        expiredToken.scope,
        exp,
        iat,
        {
          clientId: expiredToken.client.clientId,
          clientSecret: expiredToken.client.clientSecret,
          exp,
          iat,
          scopes: JSON.parse(expiredToken.scope),
        } as OAuth2Request,
        expiredToken.userId !== null ? expiredToken.userId : undefined,
      ),
    );

    return new OAuth2Response(
      accessToken.accessToken,
      accessToken.refreshToken,
      ~~((accessToken.accessTokenExpiresAt.getTime() - Date.now()) / 1000),
      ~~((accessToken.refreshTokenExpiresAt.getTime() - Date.now()) / 1000),
    );
  }
}
