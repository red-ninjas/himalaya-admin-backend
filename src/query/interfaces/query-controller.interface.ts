import { BaseEntity } from 'typeorm';

export interface IQueryController {
  model: typeof BaseEntity;
}
