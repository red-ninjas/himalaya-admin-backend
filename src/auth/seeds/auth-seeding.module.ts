import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PermissionEntity,
  PermissionGroupEntity,
  RoleEntity,
} from '../entities';
import { AuthSeedingService } from './auth-seeding.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionGroupEntity,
      RoleEntity,
      PermissionEntity,
    ]),
  ],
  providers: [AuthSeedingService],
  exports: [AuthSeedingService],
})
export class AuthSeedingModule {}
