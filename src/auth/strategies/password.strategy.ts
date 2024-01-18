import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccessTokenCommand } from '../commands/create-access-token.command';
import { Oauth2GrantStrategy } from '../decorators/oauth2-grant-strategy.decorator';
import { ClientEntity } from '../entities/client.entity';
import { AccessTokenEntity } from '../entities/accoss-token.entity';
import {
  Oauth2GrantStrategyInterface,
  ClientRepositoryInterface,
  UserValidatorInterface,
} from '../interfaces';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { OAuth2Response } from '../resources/oauth2-response.dto';

@Oauth2GrantStrategy('password')
export class PasswordStrategy implements Oauth2GrantStrategyInterface {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param userValidator
   * @param commandBus
   */
  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
    @Inject('UserValidatorInterface')
    private readonly userValidator: UserValidatorInterface,
    private readonly commandBus: CommandBus,
  ) {}

  async validate(
    request: OAuth2Request,
    client: ClientEntity,
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
    client: ClientEntity,
  ): Promise<OAuth2Response> {
    const user = await this.userValidator.validate(
      request.username,
      request.password,
    );
    const requestScopes =
      typeof request.scopes === 'string' ? [request.scopes] : request.scopes;
    const accessToken: AccessTokenEntity = await this.commandBus.execute(
      new CreateAccessTokenCommand(
        client.id,
        JSON.stringify(requestScopes),
        request.exp,
        request.iat,
        request,
        user.id,
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
