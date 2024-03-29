import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Oauth2GrantStrategy } from '../decorators/oauth2-grant-strategy.decorator';
import { CreateAccessTokenCommand } from '../commands/create-access-token.command';
import { Oauth2ClientEntity } from '../entities/oauth2-client.entity';
import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';
import {
  Oauth2GrantStrategyInterface,
  ClientRepositoryInterface,
} from '../interfaces';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { OAuth2Response } from '../responses/oauth2-response.dto';

@Oauth2GrantStrategy('client_credentials')
export class ClientCredentialsStrategy implements Oauth2GrantStrategyInterface {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param commandBus
   */
  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
    private readonly commandBus: CommandBus,
  ) {}

  async validate(
    request: OAuth2Request,
    client: Oauth2ClientEntity,
  ): Promise<boolean> {
    if (
      client.clientSecret !== request.clientSecret ||
      !request.clientSecret ||
      client.deletedAt !== null ||
      !client.grants.includes(request.grantType)
    ) {
      return false;
    }

    const scopes: string[] = JSON.parse(client.scope);
    const requestScopes =
      typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
    return requestScopes.every(scope => scopes.includes(scope));
  }

  async getOauth2Response(
    request: OAuth2Request,
    client: Oauth2ClientEntity,
  ): Promise<OAuth2Response> {
    const requestScopes =
      typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
    const accessToken: Oauth2AccessTokenEntity = await this.commandBus.execute(
      new CreateAccessTokenCommand(
        client.id,
        JSON.stringify(requestScopes),
        request.exp,
        request.iat,
        request,
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
