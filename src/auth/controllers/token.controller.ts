import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenEntity } from '../entities';
import { QueryController } from '../../query/controllers';

@Controller({
  path: 'tokens',
  version: ['1'],
})
@ApiTags('auth')
export class TokenController extends QueryController(AccessTokenEntity) {}
