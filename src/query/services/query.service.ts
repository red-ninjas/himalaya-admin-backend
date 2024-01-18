import { Injectable } from '@nestjs/common';
import { QueryStorage } from '../storage';

@Injectable()
export class QueryService {
  constructor() {}

  public getOptions() {
    return QueryStorage.getOptions();
  }
  /*

  public hasSchema(schema: string) {
    return Object.keys(this._resources).includes(schema);
  }

  public getAllFields(schema: string) {
    const _schema = this.getRepository(schema);
    const fields = _schema.metadata.propertiesMap;

    return Object.keys(fields);
  }

  public getMetaDataFields(schema: string): ResourceDictonary<MetaDataResult> {
    const _schema = this.getRepository(schema);
    const fields = _schema.metadata.columns;
    const instance = _schema.create();

    const modelFields = Object.fromEntries(
      fields
        .filter(field => {
          return (
            Reflect.hasMetadata(
              ADMIN_FIELD_DECORATOR_KEY,
              instance,
              field.propertyName,
            ) || field.isPrimary
          );
        })
        .map(field => {
          const currentOptions =
            Reflect.getMetadata(
              ADMIN_FIELD_DECORATOR_KEY,
              instance,
              field.propertyName,
            ) || {};

          const defaultOptions: MetaDataResult = {
            readPermission: this.options.adminRoleName,
            editPermission: this.options.adminRoleName,
            isFilterable: false,
            isSortable: false,
          };

          const options = _.defaults(currentOptions, defaultOptions);

          options.isNullable = field.isNullable;
          options.isPrimary = field.isPrimary;

          return [field.propertyName, options];
        }),
    );

    return modelFields;
  }

  public getMetaDataField(
    schema: string,
    field: string,
  ): MetaDataResult | undefined {
    const fields = this.getMetaDataFields(schema);
    return fields[field];
  }

  public getSchema(schema: string): EntityClassOrSchema {
    return this._resources[schema];
  }

  public getRepository(schema: string): Repository<any> {
    const _schema = this.getSchema(schema);
    return this.dataSource.getRepository(_schema);
  }

  public registerEntity(schemaName: string, type: EntityClassOrSchema) {
    this._resources[schemaName] = type;
  }
  */
}
