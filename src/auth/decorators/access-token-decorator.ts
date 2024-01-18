import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AccessTokenRequired = () => UseGuards(AuthGuard('access-token'));
