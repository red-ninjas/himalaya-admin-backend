import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { AuthJwtTokenEntity } from '../auth/entities/auth-jwt-token.entity';
import { AuthRoleAssignmentEntity } from '../auth/entities/auth-role-assignment.entity';
import { AuthRoleEntity } from '../auth/entities/auth-role.entity';

@Global()
@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([
      AuthJwtTokenEntity,
      AuthRoleEntity,
      AuthRoleAssignmentEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class JwtAuthModule {}
