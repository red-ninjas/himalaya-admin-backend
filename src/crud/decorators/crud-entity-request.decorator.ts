import {
  Header,
  SetMetadata,
  Type,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { CrudEntityDetectionGuard } from '../guards/crud-entity-detection.guard';

/**
 * Detects the entity by parameter and store it into the request
 *
 * @param entity - The typeorm entity Type
 * @param primaryKey - The primary key of your typeorm entity
 * @param urlKey - The route param key
 * @returns
 */
export const CrudEntityRequest = <TypeOrmEntity extends Type<BaseEntity>>(
  entity: TypeOrmEntity,
  primaryKey: string = 'id',
  urlKey?: string,
) => {
  return applyDecorators(
    SetMetadata('queryPrimaryKey', primaryKey),
    SetMetadata('queryRouteKey', urlKey || primaryKey),
    SetMetadata('queryType', entity),
    Header('Content-Type', 'application/json'),
    UseGuards(CrudEntityDetectionGuard),
  );
};
