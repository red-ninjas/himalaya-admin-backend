import { Oauth2AccessTokenEntity } from '../entities/oauth2-accoss-token.entity';
import {
  Oauth2PayloadInterface,
  Oauth2PayloadType,
} from './oauth2-payload.interface';

/**
 * Represents a UserPayload
 */
export class UserPayload implements Oauth2PayloadInterface {
  /**
   * The current payload type should not be changed as it should always be user in this case
   */
  readonly type: Oauth2PayloadType = Oauth2PayloadType.USER;

  constructor(
    public readonly accessToken: Oauth2AccessTokenEntity,
    public readonly id: string,
    public readonly email: string,
  ) {}
}
