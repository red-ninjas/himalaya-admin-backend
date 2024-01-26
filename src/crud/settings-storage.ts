import { QueryOptions } from './interfaces';

export class CrudSettingsStorage {
  private static queryOptions: QueryOptions = {};

  static setOptions(options: QueryOptions): void {
    this.queryOptions = options;
  }

  static getOptions(): QueryOptions {
    return this.queryOptions;
  }
}
