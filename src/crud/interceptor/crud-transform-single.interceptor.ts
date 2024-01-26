import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CrudTransformSingleInterceptor implements NestInterceptor {
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
        map((data: any) => {
          return plainToInstance(this.transformDto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    } else {
      return handler.handle();
    }
  }
}
