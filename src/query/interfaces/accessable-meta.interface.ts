import { BaseEntity } from 'typeorm';

export interface AccesableMetaInterface {
  name: string;
  group: string;
  entity: typeof BaseEntity;
}
