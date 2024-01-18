import { BaseEntity } from 'typeorm';

export interface QueryOptions {
  adminRoleName?: string;
}

export interface QueryModuleOptions {
  entities: typeof BaseEntity[];
  group: string;
}
