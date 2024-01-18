import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionEntity } from './auth-permission.entity';

@Entity('schema_auth_permission_groups')
export class PermissionGroupEntity extends BaseEntity {
  @PrimaryColumn('varchar', {
    length: 120,
  })
  slug: string;

  @Column('varchar', {
    length: 120,
  })
  displayTitle: string;

  @OneToMany(() => PermissionEntity, role => role.slug)
  permissions?: Array<PermissionEntity>;
}
