import {
  ClassSerializerInterceptor,
  Header,
  Type,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { CrudTransformSingleInterceptor } from '../interceptor/crud-transform-single.interceptor';
type ClassLike<T> = new <T>(...args: any[]) => any;

/**
 *
 * @param path
 * @param dataDto
 * @param options
 * @returns
 */
export const CrudTransformResponse = <
  EntityDTO extends Type<BaseEntity>,
  ResponseDTO extends ClassLike<any> = EntityDTO
>(
  entity: EntityDTO,
  output?: ResponseDTO,
) => {
  const responseType = output ? output : entity;

  return applyDecorators(
    Header('Content-Type', 'application/json'),
    UseInterceptors(ClassSerializerInterceptor),
    UseInterceptors(new CrudTransformSingleInterceptor(entity, output)),
    ApiExtraModels(responseType),
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(responseType) }],
      },
    }),
  );
};
