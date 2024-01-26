import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudPaginationResource } from '../resources/crud-pagination.resource';

export class CrudTransformPaginationInterceptor implements NestInterceptor {
  constructor(
    private originalDto: any,
    private transformDto: any | undefined,
  ) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    if (
      this.originalDto != this.transformDto &&
      this.transformDto !== undefined
    ) {
      return handler.handle().pipe(
        map((data: CrudPaginationResource<any>) => {
          const newData = data;
          data.data = plainToInstance(this.transformDto, data.data, {
            excludeExtraneousValues: true,
          });
          return newData;
        }),
      );
    } else {
      return handler.handle();
    }
  }
}
