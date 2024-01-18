import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryController } from '../../query/controllers';
import { RoleEntity } from '../entities';

@Controller({
  path: 'roles',
  version: ['1'],
})
@ApiTags('roles')
export class RolesController extends QueryController(RoleEntity) {}
