import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import _ from 'lodash';
import { BaseEntity } from 'typeorm';
import { QueryService } from './services/query.service';
import { QueryStorage } from './storage';

@Module({})
export class QueryModule {
  public static forFeature(entities: typeof BaseEntity[]): DynamicModule {
    return {
      module: QueryModule,
      providers: [QueryService],
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [QueryService],
    };
  }

  public static forRoot(options): DynamicModule {
    QueryStorage.setOptions(
      _.defaults(options, {
        adminRoleName: 'system',
      }),
    );

    return {
      module: QueryModule,
      imports: [],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
