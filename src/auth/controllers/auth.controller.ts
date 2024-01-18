import {
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Inject,
  Post,
  Body,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { OAuth2Request } from '../requests/oauth2-request.dto';
import { OAuth2Response } from '../resources/oauth2-response.dto';
import { Oauth2GrantStrategyRegistry } from '../services/strategy.registry';
import { ClientRepositoryInterface } from '../interfaces/client-repository.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'oauth2',
  version: ['1'],
})
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  /**
   * Constructor
   *
   * @param clientRepository
   * @param strategyRegistry
   */
  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
    private readonly strategyRegistry: Oauth2GrantStrategyRegistry,
  ) {}

  @Version('1')
  @Post('token')
  async token(@Body() request: OAuth2Request): Promise<OAuth2Response> {
    const client = await this.clientRepository.findByClientId(request.clientId);
    if (!(await this.strategyRegistry.validate(request, client))) {
      throw new ForbiddenException(
        'You are not allowed to access the given resource',
      );
    }

    return await this.strategyRegistry.getOauth2Response(request, client);
  }
}
