import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import {
  PermissionGroupEntity,
  RoleEntity,
  PermissionEntity,
} from '../entities';
import {
  DEFAULT_SYSTEM_PERMISSION_GROUP,
  DEFAULT_SYSTEM_ROLES_PERMISSION_NAME,
  DEFAULT_USER_ROLE_NAME,
  DEFAULT_ADMIN_ROLE_NAME,
} from '../constants';

@Injectable()
export class AuthSeedingService {
  constructor(
    @InjectRepository(PermissionGroupEntity)
    private permissionGroupRepo: Repository<PermissionGroupEntity>,
    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,

    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
  ) {}

  async run() {
    const defaultGroup = await this.permissionGroupRepo.save({
      slug: DEFAULT_SYSTEM_PERMISSION_GROUP,
      displayTitle: 'System',
    });

    await this.permissionRepo.save({
      slug: DEFAULT_SYSTEM_ROLES_PERMISSION_NAME,
      displayTitle: 'Roles',
      group: defaultGroup,
    });

    await this.permissionGroupRepo.save({
      slug: DEFAULT_USER_ROLE_NAME,
      displayTitle: 'User',
    });

    await this.roleRepo.save({
      slug: DEFAULT_ADMIN_ROLE_NAME,
      displayTitle: 'Administrator',
    });
  }
}
