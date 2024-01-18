import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { AbstractRepository, EntitySchema, Repository } from 'typeorm';
import { ADMIN_QUERY_FIELDS } from './constants';

export function getRepositoryName(entity: EntityClassOrSchema): string {
  if (
    entity instanceof Function &&
    (entity.prototype instanceof Repository ||
      entity.prototype instanceof AbstractRepository)
  ) {
    return entity.name;
  }

  if (entity instanceof EntitySchema) {
    const schemaName = entity.options.target
      ? entity.options.target.name
      : entity.options.name;
    return schemaName;
  }

  return entity.name;
}

export const registerMetaField = (
  entity: Object,
  identifier: Symbol,
  propertyName: string,
  data: any,
) => {
  Reflect.defineMetadata(identifier, data, entity, propertyName);

  const identifierStr = identifier.description;

  let classMetaFrame: any =
    Reflect.getOwnMetadata(ADMIN_QUERY_FIELDS, entity) || {};

  if (classMetaFrame[identifierStr] === undefined) {
    classMetaFrame[identifierStr] = [];
  }

  if (!classMetaFrame[identifierStr].includes(propertyName)) {
    classMetaFrame[identifierStr].push(propertyName);
    Reflect.defineMetadata(ADMIN_QUERY_FIELDS, classMetaFrame, entity);
  }
};

export const getMetaField = (entity: Object, identifier: Symbol): string[] => {
  const metaDataFrame = Reflect.getMetadata(ADMIN_QUERY_FIELDS, entity) || {};

  const identifierStr: string = identifier.description;

  if (metaDataFrame[identifierStr] !== undefined) {
    return metaDataFrame[identifierStr] as string[];
  } else {
    return [];
  }
};
