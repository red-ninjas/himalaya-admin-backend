import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DEFAULT_SYSTEM_PERMISSION_NAME } from '../constants';
import { AuthAccessTokenRequired } from './auth-access-token-required.decorator';
import { AuthWithPermission } from './auth-with-permission.decorator';

export const AuthPermission = (
  permission: string = DEFAULT_SYSTEM_PERMISSION_NAME,
) => {
  return applyDecorators(
    AuthWithPermission(permission),
    AuthAccessTokenRequired(),
    ApiBearerAuth(),
  );
};
