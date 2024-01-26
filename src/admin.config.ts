import { ModuleMetadata } from '@nestjs/common';
import { OAuth2Options } from './auth';
import { QueryOptions } from './crud';

export interface ResourceDictonary<T> {
  [Key: string]: T;
}
export interface AdminConfig extends Pick<ModuleMetadata, 'imports'> {
  query?: QueryOptions;
  auth: OAuth2Options;
}
