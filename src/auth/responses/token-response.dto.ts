import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenResponse {
  @ApiProperty({
    type: String,
    description: 'The generated access token',
    required: true,
  })
  @Expose({ name: 'access_token' })
  accessToken: string;

  @ApiProperty({
    description: 'The datetime when the access token expires',
    required: true,
  })
  @Expose({ name: 'access_token_expires_at' })
  accessTokenExpiresAt: Date;

  @ApiProperty({
    description: 'The ms until the refresh token expires',
    required: true,
  })
  @Expose({ name: 'access_token_expires_in_ms' })
  accessTokenExpireMs: number;

  @ApiProperty({
    type: String,
    description: 'The generated refresh token',
    required: true,
  })
  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  @ApiProperty({
    description: 'The datetime when the refresh token expires',
    required: true,
  })
  @Expose({ name: 'refresh_token_expires_at' })
  refreshTokenExpiresAt: Date;

  @ApiProperty({
    description: 'The ms until the token expires',
    required: true,
  })
  @Expose({ name: 'refresh_token_expires_in_ms' })
  refreshTokenExpiresMs: number;

  /**
   * Main method used to build this object
   *
   * @param token
   * @param user
   */
  constructor(
    accessToken: string,
    accessTokenExpiresAt: Date,
    accessTokenExpirems: number,
    refreshToken: string,
    refreshTokenExpiresAt: Date,
    refreshTokenExpiresMs: number,
  ) {
    this.accessToken = accessToken;
    this.accessTokenExpiresAt = accessTokenExpiresAt;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    this.refreshTokenExpiresMs = accessTokenExpirems;
    this.accessTokenExpireMs = refreshTokenExpiresMs;
  }
}
