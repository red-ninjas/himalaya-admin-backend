import {
  ClassSerializerInterceptor,
  DynamicModule,
  Global,
  Logger,
  Module,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import {
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
  Reflector,
} from '@nestjs/core';
import { AdminConfig } from './admin.config';
import { AuthModule } from './auth';
import { CONFIG_INJECT_KEY } from './constants';
import { CrudModule } from './crud/crud.module';
import { JwtModule } from '@nestjs/jwt';

@Module({})
@Global()
export class AdminModule implements OnModuleInit {
  private readonly logger = new Logger('AdminModule');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public async onModuleInit() {
    this.logger.log('Admin Module Initialized');
  }

  static forRoot(options: AdminConfig): DynamicModule {
    return {
      module: AdminModule,
      imports: [
        AuthModule.forRoot(options.auth),
        CrudModule.forRoot(options.query),
        JwtModule.register({
          global: true,
          secret: options.auth.jwtSecret,
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [
        {
          provide: CONFIG_INJECT_KEY,
          useValue: options,
        },
        {
          useFactory: () => {
            return new ValidationPipe({ transform: true });
          },
          provide: APP_PIPE,
          inject: [],
        },
        {
          provide: APP_INTERCEPTOR,
          useFactory: (reflector: Reflector) => {
            return new ClassSerializerInterceptor(reflector);
          },
          inject: [Reflector],
        },
      ],
      exports: [JwtModule],
    };
  }
}
