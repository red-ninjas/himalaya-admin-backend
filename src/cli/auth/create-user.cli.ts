import { CommandBus } from '@nestjs/cqrs';
import { Command, CommandRunner, Option } from 'nest-commander';
import { CreateUserCommand } from '../../auth/commands/create-user-command';

interface BasicCommandOptions {
  password?: string;
  role?: string;
}

@Command({
  name: 'system:admin',
  description: 'Generate a new system administrator',
  arguments: '<username>',
  options: { isDefault: true },
})
export class CreateUserCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'With custom password',
  })
  parsePassword(val: string) {
    return val;
  }

  @Option({
    flags: '-r, --role <role>',
    description: 'With custom role',
  })
  parseRole(val: string) {
    return val;
  }

  async run(args: string[], options: BasicCommandOptions): Promise<void> {
    await this.commandBus.execute(
      new CreateUserCommand(args[0], options.password, options.role),
    );
  }
}
