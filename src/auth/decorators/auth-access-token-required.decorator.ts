import { UseGuards } from '@nestjs/common';
import { JwtTokenGuard } from '../../jwt/guards/jwt-token.guard';

export const AuthAccessTokenRequired = () => UseGuards(JwtTokenGuard);
