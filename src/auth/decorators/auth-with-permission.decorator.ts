import { Reflector } from '@nestjs/core/services/reflector.service';

export const AuthWithPermission = Reflector.createDecorator<
  string | undefined
>();
