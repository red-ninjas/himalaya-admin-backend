import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { PermissionGroupEntity } from './auth-permission-group.entity';
import { RoleEntity } from './auth-role.entity';
import { QueryEntity, ViewableColumn } from '../../query/decorators';

@QueryEntity({})
@Entity('schema_auth_permissions')
export class PermissionEntity extends BaseEntity {
  @ViewableColumn()
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @OneToMany(() => RoleEntity, role => role.slug)
  role: Array<RoleEntity>;

  @Column('varchar', {
    length: 120,
  })
  @ViewableColumn()
  displayTitle: string;

  @ManyToOne(() => PermissionGroupEntity, group => group.slug)
  group: PermissionGroupEntity;
}
