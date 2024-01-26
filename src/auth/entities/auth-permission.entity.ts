import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { AuthPermissionGroupEntity } from './auth-permission-group.entity';

@Entity('system_permissions')
export class AuthPermissionEntity extends BaseEntity {
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @Column('varchar', {
    length: 120,
  })
  displayTitle: string;

  @ManyToOne(() => AuthPermissionGroupEntity, group => group.slug)
  @JoinColumn({ name: 'group' })
  group: AuthPermissionGroupEntity;
}
