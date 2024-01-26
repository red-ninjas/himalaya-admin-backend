import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsArray, IsNotEmpty } from 'class-validator';

@Injectable()
export class CrudSearchRequestSortablesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const fields =
        this.reflector.get<string[] | undefined>(
          'sortableFields',
          context.getHandler(),
        ) || [];
      request.filterableFields = fields;

      if (
        request.body &&
        IsNotEmpty(request.body.filter) &&
        IsArray(request.body.filter)
      ) {
        for (let { field } of request.body.filter) {
          if (!fields.includes(field)) {
            throw new Error(
              `"${field}" is not a allowed field for the sort function.`,
            );
          }
        }
      }

      return true;
    } catch (err) {
      throw new HttpException(err.message || err, 400);
    }
  }
}
