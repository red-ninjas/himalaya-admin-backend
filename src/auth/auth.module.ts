import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { AccessTokenEntity, ClientEntity, ClientRolesEntity } from './entities';

import { Oauth2GrantStrategyRegistry, StrategyExplorer } from './services';

import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAUTH2_SERVER_OPTIONS } from './auth.constants';
import { CreateAccessTokenHandler, CreateClientHandler } from './commands';
import { AuthController } from './controllers';
import { RoleEntity } from './entities/auth-role.entity';
import { AccessTokenRepository, ClientRepository } from './repository';
import {
  AccessTokenStrategy,
  ClientCredentialsStrategy,
  PasswordStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { OAuth2Options } from './types';
import { QueryModule } from '../query/query.module';
import { TokenController } from './controllers/token.controller';
import { RolesController } from './controllers/roles.controller';

export const CommandHandlers = [CreateClientHandler, CreateAccessTokenHandler];

export const EventHandlers = [];

export const QueryHandlers = [];

export const Sagas = [];

export const Services = [
  { provide: 'ClientRepositoryInterface', useClass: ClientRepository },
  {
    provide: 'AccessTokenRepositoryInterface',
    useClass: AccessTokenRepository,
  },
];

export const ServiceNames = [
  'ClientRepositoryInterface',
  'AccessTokenRepositoryInterface',
];

export const Resolvers = [];

export const Oauth2Strategies = [
  ClientCredentialsStrategy,
  RefreshTokenStrategy,
  PasswordStrategy,
];

export const Providers = [StrategyExplorer, Oauth2GrantStrategyRegistry];

@Global()
@Module({})
export class AuthModule implements OnModuleInit {
  private readonly logger = new Logger('AuthModule');

  constructor(
    @Inject(OAUTH2_SERVER_OPTIONS)
    private readonly options: OAuth2Options,
    private readonly explorerService: StrategyExplorer,
    private readonly strategyRegistry: Oauth2GrantStrategyRegistry,
  ) {}

  /**
   * Create the static for Root Options
   *
   * @param options
   */
  public static forRoot(options: OAuth2Options): DynamicModule {
    const oAuth2OptionsProvider = {
      provide: OAUTH2_SERVER_OPTIONS,
      useValue: options,
    };

    const userLoaderProvider = {
      provide: 'UserLoaderInterface',
      useFactory: async options => {
        return options.userLoader;
      },
      inject: [OAUTH2_SERVER_OPTIONS],
    };

    const userValidatorProvider = {
      provide: 'UserValidatorInterface',
      useFactory: async options => {
        return options.userValidator;
      },
      inject: [OAUTH2_SERVER_OPTIONS],
    };

    return {
      module: AuthModule,
      imports: [
        CqrsModule,
        TypeOrmModule.forFeature([
          ClientEntity,
          AccessTokenEntity,
          RoleEntity,
          ClientRolesEntity,
        ]),
        QueryModule.forFeature([AccessTokenEntity, RoleEntity]),
      ],
      controllers: [AuthController, TokenController, RolesController],
      providers: [
        oAuth2OptionsProvider,
        userValidatorProvider,
        userLoaderProvider,
        ...Providers,
        ...Services,
        ...Resolvers,
        ...Oauth2Strategies,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...Sagas,
        AccessTokenStrategy,
      ],
      exports: [
        ...Providers,
        ...ServiceNames,
        userValidatorProvider,
        userLoaderProvider,
      ],
    };
  }

  onModuleInit() {
    this.logger.log('AuthModule Register Strategies');

    const { strategies } = this.explorerService.explore();
    this.strategyRegistry.register(strategies);

    this.logger.log('AuthModule Initialized');
  }
}
