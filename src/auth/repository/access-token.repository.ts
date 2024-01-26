import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';
import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';
import { AccessTokenNotFoundException } from '../exceptions/access-token-not-found.exception';
import { AccessTokenRepositoryInterface } from '../interfaces/access-token-repository.interface';

@Injectable()
export class AccessTokenRepository implements AccessTokenRepositoryInterface {
  constructor(
    @InjectRepository(Oauth2AccessTokenEntity)
    private readonly repository: Repository<Oauth2AccessTokenEntity>,
  ) {}

  async findByAccessToken(
    accessToken: string,
  ): Promise<Oauth2AccessTokenEntity> {
    const token = await this.repository.findOne({
      where: {
        accessToken: accessToken,
      },
      relations: ['client'],
    });

    if (!token) {
      throw AccessTokenNotFoundException.withAccessToken(accessToken);
    }

    return token;
  }

  async findByRefreshToken(
    refreshToken: string,
  ): Promise<Oauth2AccessTokenEntity> {
    const token = await this.repository.findOne({
      where: {
        refreshToken: refreshToken,
      },
      relations: ['client'],
    });

    if (!token) {
      throw AccessTokenNotFoundException.withRefreshToken(refreshToken);
    }

    return token;
  }

  async create(
    accessToken: Oauth2AccessTokenEntity,
  ): Promise<Oauth2AccessTokenEntity> {
    return await this.repository.save(accessToken);
  }

  async delete(accessToken: Oauth2AccessTokenEntity): Promise<DeleteResult> {
    return await this.repository.delete(accessToken.id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
