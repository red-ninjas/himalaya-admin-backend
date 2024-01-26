import { DynamicModule, Module } from '@nestjs/common';
import _ from 'lodash';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { CrudSettingsStorage } from './settings-storage';

@Module({})
export class CrudModule {
  public static forFeature(): DynamicModule {
    return {
      module: CrudModule,
      providers: [],
      imports: [JwtAuthModule],
      exports: [],
    };
  }

  public static forRoot(options): DynamicModule {
    CrudSettingsStorage.setOptions(
      _.defaults(options, {
        adminRoleName: 'system',
      }),
    );

    return {
      module: CrudModule,
      imports: [JwtAuthModule],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
