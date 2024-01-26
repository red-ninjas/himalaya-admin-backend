import {
  DynamicModule,
  Global,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  Oauth2AccessTokenEntity,
  Oauth2ClientEntity,
  AuthPermissionEntity,
  AuthPermissionGroupEntity,
  AuthRoleAssignmentEntity,
} from './entities';

import { ScheduleModule } from '@nestjs/schedule';
import { Oauth2GrantStrategyRegistry, StrategyExplorer } from './services';

import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { CrudModule } from '../crud/crud.module';
import { OAUTH2_SERVER_OPTIONS } from './auth.constants';
import {
  CreateAccessTokenHandler,
  CreateClientHandler,
  CreateSystemPermissionHandler,
} from './commands';
import { CreateUserHandle } from './commands/create-user-handler';
import { AuthController } from './controllers';
import { Oauth2Controller } from './controllers/oauth2.controller';
import { RolesController } from './controllers/roles.controller';
import { TokenController } from './controllers/token.controller';
import { AuthRoleEntity } from './entities/auth-role.entity';
import { AuthJwtTokenEntity } from './entities/auth-jwt-token.entity';
import { AccessTokenRepository, ClientRepository } from './repository';
import {
  AccessTokenStrategy,
  ClientCredentialsStrategy,
  PasswordStrategy,
  RefreshTokenStrategy,
} from './strategies';
import { AuthTasksService } from './tasks/auth-tasks-service';
import { OAuth2Options } from './types';

export const CommandHandlers = [
  CreateClientHandler,
  CreateAccessTokenHandler,
  CreateUserHandle,
  CreateSystemPermissionHandler,
];

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

    const systemAdminProvider = {
      provide: 'SystemAdminInterface',
      useFactory: async options => {
        return options.systemAdminCreator;
      },
      inject: [OAUTH2_SERVER_OPTIONS],
    };

    return {
      module: AuthModule,
      imports: [
        JwtAuthModule,
        JwtModule.register({
          global: true,
          secret: options.jwtSecret,
          signOptions: { expiresIn: '30d' },
        }),
        CqrsModule,
        TypeOrmModule.forFeature([
          AuthJwtTokenEntity,
          AuthPermissionGroupEntity,
          AuthPermissionEntity,
          AuthRoleEntity,
          AuthRoleAssignmentEntity,
          Oauth2ClientEntity,
          Oauth2AccessTokenEntity,
        ]),
        CrudModule.forFeature(),
        ScheduleModule.forRoot(),
      ],
      controllers: [
        Oauth2Controller,
        AuthController,
        TokenController,
        RolesController,
      ],
      providers: [
        oAuth2OptionsProvider,
        userValidatorProvider,
        userLoaderProvider,
        systemAdminProvider,
        ...Providers,
        ...Services,
        ...Resolvers,
        ...Oauth2Strategies,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...Sagas,
        AccessTokenStrategy,
        AuthTasksService,
      ],
      exports: [
        ...Providers,
        ...ServiceNames,
        userValidatorProvider,
        userLoaderProvider,
        systemAdminProvider,
        JwtModule,
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
