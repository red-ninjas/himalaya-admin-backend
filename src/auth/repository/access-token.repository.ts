import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';
import { AccessTokenEntity } from '../entities/accoss-token.entity';
import { AccessTokenNotFoundException } from '../exceptions/access-token-not-found.exception';
import { AccessTokenRepositoryInterface } from '../interfaces/access-token-repository.interface';

@Injectable()
export class AccessTokenRepository implements AccessTokenRepositoryInterface {
  constructor(
    @InjectRepository(AccessTokenEntity)
    private readonly repository: Repository<AccessTokenEntity>,
  ) {}

  async findByAccessToken(accessToken: string): Promise<AccessTokenEntity> {
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

  async findByRefreshToken(refreshToken: string): Promise<AccessTokenEntity> {
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

  async create(accessToken: AccessTokenEntity): Promise<AccessTokenEntity> {
    return await this.repository.save(accessToken);
  }

  async delete(accessToken: AccessTokenEntity): Promise<DeleteResult> {
    return await this.repository.delete(accessToken.id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
