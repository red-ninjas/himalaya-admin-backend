import { CommandBus } from '@nestjs/cqrs';
import { Command, CommandRunner } from 'nest-commander';
import { CreateSystemPermissionCommand } from '../../auth/commands';

@Command({
  name: 'system:permissions',
  description: 'Create default system permissions',
})
export class CreateSystemPermissionsCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(args: string[], options: any): Promise<void> {
    await this.commandBus.execute(new CreateSystemPermissionCommand());
  }
}
