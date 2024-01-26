import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'roles',
  version: ['1'],
})
@ApiTags('roles')
export class RolesController {}
