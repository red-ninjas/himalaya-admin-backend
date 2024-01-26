import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AccessTokenRepositoryInterface,
  UserLoaderInterface,
  Oauth2PayloadInterface,
  UserPayload,
  ClientPayload,
} from '../interfaces';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    @Inject('AccessTokenRepositoryInterface')
    private readonly accessTokenRepository: AccessTokenRepositoryInterface,
    @Inject('UserLoaderInterface')
    private readonly userLoader: UserLoaderInterface,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  /**
   * Validate the bearer (accessToken) using the HTTP Bearer Header strategy
   *
   * @param bearer
   */
  async validate(bearer: string): Promise<Oauth2PayloadInterface> {
    const accessToken = await this.accessTokenRepository.findByAccessToken(
      bearer,
    );
    if (
      !accessToken ||
      accessToken.accessTokenExpiresAt < new Date(Date.now())
    ) {
      throw new UnauthorizedException();
    }

    if (accessToken.userId) {
      const user = await this.userLoader.load(
        this.dataSource,
        accessToken.userId,
      );
      return new UserPayload(accessToken, accessToken.userId, user.email);
    }

    return new ClientPayload(
      accessToken,
      accessToken.client.id,
      accessToken.client.clientId,
      accessToken.client.name,
    );
  }
}
