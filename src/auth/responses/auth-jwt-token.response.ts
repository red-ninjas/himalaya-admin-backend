import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthJwtTokenEntity } from '../entities/auth-jwt-token.entity';

export class AuthJwtTokenResponse {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  identifier: string;
  @Expose()
  @ApiProperty()
  createdAt: Date;
  @Expose()
  @ApiProperty()
  revokedAt: Date;
  @Expose()
  @ApiProperty()
  accessTokenExpiresAt: Date;
  @Expose()
  @ApiProperty()
  refreshTokenExpiresAt: Date;

  constructor(partial: Partial<AuthJwtTokenEntity>) {
    Object.assign(this, partial);
  }
}
