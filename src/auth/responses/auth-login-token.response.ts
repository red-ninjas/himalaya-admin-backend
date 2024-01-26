import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserClass } from '../interfaces';
import { TokenResponse } from './token-response.dto';

export class AuthLoginTokenResponse {
  @ApiProperty({
    type: TokenResponse,
    description: 'The generated access token',
    required: true,
  })
  token: TokenResponse;

  @ApiProperty({
    description: 'The user datas for the user',
    required: true,
  })
  @Expose({ name: 'user' })
  user: UserClass;

  /**
   * Main method used to build this object
   *
   * @param token
   * @param user
   */
  constructor(token: TokenResponse, user: UserClass) {
    this.token = token;
    this.user = user;
  }
}
