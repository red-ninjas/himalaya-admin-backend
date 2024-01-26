import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AuthJwtTokenEntity } from '../../auth/entities/auth-jwt-token.entity';
import { AuthRoleAssignmentEntity } from '../../auth/entities/auth-role-assignment.entity';
import { UserClass } from '../../auth/interfaces';
import { AuthWithPermission } from '../../auth/decorators/auth-with-permission.decorator';
import { isEmpty } from 'lodash';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthJwtTokenEntity)
    private readonly jwtRepo: Repository<AuthJwtTokenEntity>,
    @InjectRepository(AuthRoleAssignmentEntity)
    private readonly userRoleRepo: Repository<AuthRoleAssignmentEntity>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const payload = await this.jwtService.verifyAsync(authToken);
      const user = UserClass.fromJSON(payload);
      const tokenFound = await this.jwtRepo.count({
        where: {
          identifier: user.id,
          accessToken: authToken,
          revokedAt: IsNull(),
        },
      });
      if (tokenFound <= 0) {
        throw new UnauthorizedException('Invalid token.');
      }
      request.user = user;
      request.userToken = authToken;

      const permission = this.reflector.get(
        AuthWithPermission,
        context.getHandler(),
      );

      if (!isEmpty(permission)) {
        const foundRole = await this.userRoleRepo.count({
          relations: {
            role: {
              permissions: true,
            },
          },
          where: {
            role: {
              permissions: {
                slug: permission,
              },
            },
            identifier: user.id,
          },
        });

        if (foundRole <= 0) {
          throw new UnauthorizedException(
            'The user is not a part of the required permission.',
          );
        }
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
