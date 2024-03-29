import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const CrudEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.queryItem;
  },
);
