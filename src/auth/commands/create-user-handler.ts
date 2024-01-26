import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import chalk from 'chalk';
import * as crypto from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { AuthRoleEntity, AuthRoleAssignmentEntity } from '../entities';
import { SystemAdminInterface } from '../interfaces/system-admin.interface';
import { CreateUserCommand } from './create-user-command';

const generatePassword = (
  length = 20,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map(x => characters[x % characters.length])
    .join('');
const log = console.log;

@CommandHandler(CreateUserCommand)
export class CreateUserHandle implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger('CreateUserHandle');

  constructor(
    @Inject('SystemAdminInterface')
    private readonly systemAdmin: SystemAdminInterface,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(AuthRoleEntity)
    private readonly roleRepo: Repository<AuthRoleEntity>,
    @InjectRepository(AuthRoleAssignmentEntity)
    private readonly userRoleRepo: Repository<AuthRoleAssignmentEntity>,
  ) {}

  /**
   * Execute the create Client Command
   *
   * @param command
   */
  async execute(command: CreateUserCommand) {
    try {
      const password = command.plainPassword || generatePassword();
      const adminUser = await this.systemAdmin.create(
        this.dataSource,
        command.username,
        password,
      );

      log(chalk.yellow('New user account was created..'));
      log(chalk.blue(`E-Mail: ${adminUser.email}`));
      log(chalk.blue(`Password: ${password}`));
      log(chalk.blue(`ID: ${adminUser.id}`));

      if (command.role) {
        const role = await this.roleRepo.findOneByOrFail({
          slug: command.role,
        });
        const newAdminUserRole = this.userRoleRepo.create();
        newAdminUserRole.identifier = adminUser.id;
        newAdminUserRole.role = role;
        await newAdminUserRole.save();

        log(chalk.blue(`Role: ${role}`));
      }
    } catch (e) {
      log(chalk.red(`${e}`));
    }
  }
}
