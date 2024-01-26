import { DynamicModule, Module } from '@nestjs/common';
import { CreateUserCli } from './auth/create-user.cli';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSystemPermissionsCli } from './auth/create-permissions.cli';
import { SetupCli } from './auth/setup-cli';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [CreateUserCli, CreateSystemPermissionsCli, SetupCli],
  exports: [CreateUserCli, CreateSystemPermissionsCli, SetupCli],
})
export class CliModule {}
