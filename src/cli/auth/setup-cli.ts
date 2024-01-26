import { CommandBus } from '@nestjs/cqrs';
import { Command, CommandRunner } from 'nest-commander';
import {
  CreateUserCommand,
  CreateSystemPermissionCommand,
} from '../../auth/commands';
import { DEFAULT_ADMIN_ROLE_NAME } from '../../auth/constants';

@Command({
  name: 'system:setup',
  description: 'Create default system settings',
})
export class SetupCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(args: string[], options: any): Promise<void> {
    await this.commandBus.execute(new CreateSystemPermissionCommand());
    await this.commandBus.execute(
      new CreateUserCommand(
        'admin@admin.com',
        'admin',
        DEFAULT_ADMIN_ROLE_NAME,
      ),
    );
  }
}
