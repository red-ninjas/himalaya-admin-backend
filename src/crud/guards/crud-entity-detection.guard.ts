import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { Request } from 'express';
import { BaseEntity, DataSource } from 'typeorm';

@Injectable()
export class CrudEntityDetectionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const params = request.params;

      const primaryKey: string = this.reflector.get<string>(
        'queryPrimaryKey',
        context.getHandler(),
      );

      const routeKey: string = this.reflector.get<string>(
        'queryRouteKey',
        context.getHandler(),
      );

      const queryType = this.reflector.get<typeof BaseEntity>(
        'queryType',
        context.getHandler(),
      );

      const repo = this.dataSource.getRepository(queryType);
      const conditions = {};
      conditions[primaryKey] = params[routeKey];

      const item = await repo.findOneByOrFail(conditions);

      request.queryItem = item;
      request.queryType = queryType;

      return true;
    } catch (err) {
      throw new HttpException(err.message || err, 400);
    }
  }
}
