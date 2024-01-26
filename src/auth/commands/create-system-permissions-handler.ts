import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import chalk from 'chalk';
import { Repository } from 'typeorm';
import {
  DEFAULT_ADMIN_ROLE_NAME,
  DEFAULT_SYSTEM_AUTH_PERMISSION_NAME,
  DEFAULT_SYSTEM_PERMISSION_GROUP,
  DEFAULT_SYSTEM_PERMISSION_NAME,
  DEFAULT_USER_ROLE_NAME,
} from '../constants';
import {
  AuthPermissionEntity,
  AuthPermissionGroupEntity,
  AuthRoleEntity,
} from '../entities';
import { CreateSystemPermissionCommand } from './create-system-permissions-command';

const log = console.log;

@CommandHandler(CreateSystemPermissionCommand)
export class CreateSystemPermissionHandler
  implements ICommandHandler<CreateSystemPermissionCommand> {
  private readonly logger = new Logger('CreateSystemPermission');

  constructor(
    @InjectRepository(AuthPermissionGroupEntity)
    private readonly permissionGroupRepo: Repository<AuthPermissionGroupEntity>,
    @InjectRepository(AuthPermissionEntity)
    private readonly permissionRepo: Repository<AuthPermissionEntity>,
    @InjectRepository(AuthRoleEntity)
    private readonly roleRepo: Repository<AuthRoleEntity>,
  ) {}

  /**
   * Execute the create system permission command
   *
   * @param command
   */
  async execute(command: CreateSystemPermissionCommand) {
    try {
      log(chalk.yellow(`Start creating system permissions..`));

      const permissionsGroup = this.permissionGroupRepo.create();
      permissionsGroup.displayTitle = DEFAULT_SYSTEM_PERMISSION_GROUP;
      permissionsGroup.slug = DEFAULT_SYSTEM_PERMISSION_GROUP;

      await permissionsGroup.save();
      log(
        chalk.green(
          `Create default permission group: ${DEFAULT_SYSTEM_PERMISSION_GROUP}`,
        ),
      );

      const authPermission = this.permissionRepo.create();
      authPermission.displayTitle = DEFAULT_SYSTEM_AUTH_PERMISSION_NAME;
      authPermission.slug = DEFAULT_SYSTEM_AUTH_PERMISSION_NAME;
      authPermission.group = permissionsGroup;
      await authPermission.save();

      log(
        chalk.green(
          `Create default  permission: ${authPermission.displayTitle}`,
        ),
      );

      const systemPermission = this.permissionRepo.create();
      systemPermission.displayTitle = DEFAULT_SYSTEM_PERMISSION_NAME;
      systemPermission.slug = DEFAULT_SYSTEM_PERMISSION_NAME;
      systemPermission.group = permissionsGroup;
      await systemPermission.save();

      log(
        chalk.green(
          `Create default  permission: ${systemPermission.displayTitle}`,
        ),
      );

      const adminRole = this.roleRepo.create();
      adminRole.displayTitle = DEFAULT_ADMIN_ROLE_NAME;
      adminRole.slug = DEFAULT_ADMIN_ROLE_NAME;
      adminRole.permissions = [authPermission, systemPermission];
      await adminRole.save();

      log(chalk.green(`Create admin role: ${DEFAULT_ADMIN_ROLE_NAME}`));
      log(
        chalk.green(
          `Assign ${authPermission.displayTitle} permission to ${
            adminRole.displayTitle
          }`,
        ),
      );

      log(
        chalk.green(
          `Assign ${systemPermission.displayTitle} permission to ${
            adminRole.displayTitle
          }`,
        ),
      );

      const userRole = this.roleRepo.create();
      userRole.displayTitle = DEFAULT_USER_ROLE_NAME;
      userRole.slug = DEFAULT_USER_ROLE_NAME;
      await userRole.save();

      log(chalk.green(`Create user role: ${DEFAULT_USER_ROLE_NAME}`));
    } catch (e) {
      log(chalk.red(`${e}`));
    }
  }
}
