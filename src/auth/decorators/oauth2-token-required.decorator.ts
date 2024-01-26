import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const OAuth2TokenRequired = () => UseGuards(AuthGuard('access-token'));
